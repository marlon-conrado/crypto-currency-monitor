import { injectable } from '../shared';
import { CryptoCurrencyRepository, UserRepository } from '../repositories';

@injectable()
export class GetTopCryptoCurrenciesService {
  constructor(
    private cryptoCurrencyRepository: CryptoCurrencyRepository,
    private userRepository: UserRepository,
  ) {}

  async getTop(data: {
    userId: number;
    amountRows: number;
    orderDirection: string;
  }) {
    const user = await this.userRepository.getById(data.userId);

    const topCryptoCurrencies = await this.cryptoCurrencyRepository.getTop({
      userId: user.id,
      preferredCurrency: user.preferredCurrency.name,
      limit: data.amountRows,
      orderDirection: data.orderDirection,
    });

    return topCryptoCurrencies.map((topCryptoCurrency) => ({
      symbol: topCryptoCurrency.symbol,
      ars_price: (topCryptoCurrency as any).ars_price,
      usd_price: (topCryptoCurrency as any).usd_price,
      eur_price: (topCryptoCurrency as any).eur_price,
      name: topCryptoCurrency.name,
      image: topCryptoCurrency.image,
      last_updated: topCryptoCurrency.lastUpdated,
    }));
  }
}
