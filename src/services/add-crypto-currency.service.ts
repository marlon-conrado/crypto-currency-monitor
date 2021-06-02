import {
  injectable,
  ApplicationError,
  ApplicationErrors,
  HttpStatusEnum,
} from '../shared';
import { CryptoCurrencyRepository } from '../repositories';

@injectable()
export class AddCryptoCurrencyService {
  constructor(private cryptoCurrencyRepository: CryptoCurrencyRepository) {}

  async add(data: { userId: number; coinId: string }) {
    try {
      return await this.cryptoCurrencyRepository.add(data);
    } catch (e) {
      if (e.response?.status === HttpStatusEnum.NOT_FOUND) {
        throw new ApplicationError(ApplicationErrors.CoinNotFound);
      }

      throw e;
    }
  }
}
