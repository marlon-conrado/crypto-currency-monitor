import { injectable, environment } from '../shared';
import { ApiRemote } from '../remote';

type Output = {
  symbol: string;
  name: string;
  image: string;
  last_updated: string;
  current_price: string;
}[];

@injectable()
export class CryptoCurrencyRepository {
  constructor(private apiRemote: ApiRemote) {}

  async getCoinsMarkets(vsCurrency: string): Promise<Output> {
    const coingecko = environment.endpoints.coingecko;
    const url = `${coingecko.base}/${coingecko.methods.coinsMarkets}`;

    const cryptoCurrencies = await this.apiRemote.get(url, {
      query: {
        vsCurrency,
      },
    });

    return cryptoCurrencies.data ?? {};
  }
}
