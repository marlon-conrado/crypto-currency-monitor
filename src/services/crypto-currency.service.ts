import { injectable } from '../shared';
import { UserRepository, CryptoCurrencyRepository } from '../repositories';

type Input = {
  userId: number;
};

@injectable()
export class CryptoCurrencyService {
  constructor(
    private userRepository: UserRepository,
    private cryptoCurrencyRepository: CryptoCurrencyRepository,
  ) {}

  async getAll(data: Input) {
    const user = await this.userRepository.getById(data.userId);
    const cryptoCurrencies =
      await this.cryptoCurrencyRepository.getCoinsMarkets(
        user.preferredCurrency.name,
      );

    return cryptoCurrencies.map((currency) => ({
      symbol: currency.symbol,
      name: currency.name,
      image: currency.image,
      lastUpdated: currency.last_updated,
      price: currency.current_price,
    }));
  }
}
