import {
  injectable,
  environment,
  ApplicationError,
  ApplicationErrors,
  HttpStatusEnum,
} from '../shared';
import { ApiRemote } from '../remote';
import { CryptoCurrencyLocal, CryptoCurrencyAttributes } from '../local';

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
  ) {}

  async getCoinsMarkets(vsCurrency: string): Promise<GetCoinsMarketsOutput> {
    const coingecko = environment.endpoints.coingecko;
    const url = `${coingecko.base}/${coingecko.methods.coinsMarkets}`;

    const cryptoCurrencies = await this.apiRemote.get(url, {
      query: { vsCurrency },
    });

    return cryptoCurrencies.data;
  }

  async add(data: {
    coinId: string;
    userId: number;
  }): Promise<CryptoCurrencyAttributes> {
    const coingecko = environment.endpoints.coingecko;
    const url = `${coingecko.base}/${coingecko.methods.coin}`;

    try {
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

      const cryptoCurrency = result.data;
      return await this.cryptoCurrencyLocal.add({
        coinId: cryptoCurrency.id,
        name: cryptoCurrency.name,
        symbol: cryptoCurrency.symbol,
        arsPrice: cryptoCurrency.market_data.current_price.ars,
        usdPrice: cryptoCurrency.market_data.current_price.usd,
        eurPrice: cryptoCurrency.market_data.current_price.eur,
        lastUpdated: cryptoCurrency.last_updated,
        image: cryptoCurrency.image.large,
        userId: data.userId,
      });
    } catch (e) {
      if (e?.response?.status === HttpStatusEnum.NOT_FOUND) {
        throw new ApplicationError(ApplicationErrors.CoinNotFound);
      }

      throw e;
    }
  }
}
