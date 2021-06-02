import { injectable } from '../shared';
import { CryptoCurrencyRepository } from '../repositories';

@injectable()
export class AddCryptoCurrencyService {
  constructor(private cryptoCurrencyRepository: CryptoCurrencyRepository) {}

  async add(data: { userId: number; coinId: string }) {
    return await this.cryptoCurrencyRepository.add(data);
  }
}
