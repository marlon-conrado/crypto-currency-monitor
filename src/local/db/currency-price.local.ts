import { injectable } from '../../shared';
import { CurrencyPriceModel, CurrencyPriceAttributes } from '../models';
import { Transaction } from 'sequelize';

@injectable()
export class CurrencyPriceLocal {
  async add(
    data: CurrencyPriceAttributes,
    transaction?: Transaction,
  ): Promise<CurrencyPriceAttributes> {
    const result = await new CurrencyPriceModel(data).save({ transaction });
    return result.get();
  }
}
