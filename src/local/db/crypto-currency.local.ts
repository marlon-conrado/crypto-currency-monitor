import { injectable } from '../../shared';
import { CryptoCurrencyModel, CryptoCurrencyAttributes } from '../models';

@injectable()
export class CryptoCurrencyLocal {
  async add(data: CryptoCurrencyAttributes): Promise<CryptoCurrencyAttributes> {
    const result = await new CryptoCurrencyModel(data).save();
    return result.get();
  }
}
