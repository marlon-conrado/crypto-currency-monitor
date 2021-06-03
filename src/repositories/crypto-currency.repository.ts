import {
  injectable,
  environment,
  PreferredCurrencyEnum,
  PreferredCurrencyNameEnum,
} from '../shared';
import { ApiRemote } from '../remote';
import {
  CryptoCurrencyLocal,
  CryptoCurrencyAttributes,
  CurrencyPriceLocal,
  CryptoCurrencyGetTopInput,
} from '../local';
import { database } from '../local/database.local';

type GetCoinsMarketsOutput = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  last_updated: string;
  current_price: string;
}[];

@injectable()
export class CryptoCurrencyRepository {
  constructor(
    private apiRemote: ApiRemote,
    private cryptoCurrencyLocal: CryptoCurrencyLocal,
    private currencyPriceLocal: CurrencyPriceLocal,
  ) {}

  async getCoinsMarkets(vsCurrency: string): Promise<GetCoinsMarketsOutput> {
    const coingecko = environment.endpoints.coingecko;
    const url = `${coingecko.base}/${coingecko.methods.coinsMarkets}`;

    const cryptoCurrencies = await this.apiRemote.get(url, {
      query: { vsCurrency },
    });

    return cryptoCurrencies.data;
  }

  async getTop(
    data: CryptoCurrencyGetTopInput,
  ): Promise<CryptoCurrencyAttributes[]> {
    return await this.cryptoCurrencyLocal.getTop(data);
  }

  async add(data: {
    coinId: string;
    userId: number;
  }): Promise<CryptoCurrencyAttributes> {
    const coingecko = environment.endpoints.coingecko;
    const url = `${coingecko.base}/${coingecko.methods.coin}`;

    const result = await this.apiRemote.get(url, {
      query: {
        coinId: data.coinId,
        tickers: false,
        marketData: true,
        communityData: false,
        developerData: false,
        sparkLine: false,
      },
    });

    return await database.transaction(async (t) => {
      const cryptoCurrency = result.data;
      const cryptoCurrencyResult = await this.cryptoCurrencyLocal.add(
        {
          coinId: cryptoCurrency.id,
          name: cryptoCurrency.name,
          symbol: cryptoCurrency.symbol,
          lastUpdated: cryptoCurrency.last_updated,
          image: cryptoCurrency.image.large,
          userId: data.userId,
        },
        t,
      );

      await this.addCoinPrices(
        cryptoCurrencyResult.id,
        cryptoCurrency.market_data.current_price,
        t,
      );

      return cryptoCurrencyResult;
    });
  }

  private async addCoinPrices(
    cryptoCurrencyId: number,
    prices: any[],
    dbTransaction: any,
  ) {
    const availableCurrencies = [
      PreferredCurrencyNameEnum.ars,
      PreferredCurrencyNameEnum.eur,
      PreferredCurrencyNameEnum.usd,
    ];

    const coinPricesPromises = Object.keys(prices)
      .filter((key: PreferredCurrencyNameEnum) =>
        availableCurrencies.includes(key),
      )
      .map(async (key) => {
        const price = prices[key];
        await this.currencyPriceLocal.add(
          {
            price,
            currencyTypeId: PreferredCurrencyEnum[key],
            cryptoCurrencyId,
          },
          dbTransaction,
        );
      });

    await Promise.all(coinPricesPromises);
  }
}
