import {
  injectable,
  PreferredCurrencyEnum,
  PreferredCurrencyNameEnum,
} from '../../shared';
import { CryptoCurrencyModel, CryptoCurrencyAttributes } from '../models';
import { Transaction, literal } from 'sequelize';

export type CryptoCurrencyGetTopInput = {
  userId: number;
  preferredCurrency: PreferredCurrencyNameEnum;
  limit: number;
  orderDirection: string;
};

@injectable()
export class CryptoCurrencyLocal {
  async add(
    data: CryptoCurrencyAttributes,
    transaction?: Transaction,
  ): Promise<CryptoCurrencyAttributes> {
    const result = await new CryptoCurrencyModel(data).save({ transaction });
    return result.get();
  }

  async getTop(
    data: CryptoCurrencyGetTopInput,
  ): Promise<CryptoCurrencyAttributes[]> {
    const getSubQuery = (currencyType: number): string =>
      ` (SELECT price from currency_price cp 
        WHERE cp.crypto_currency_id = "CryptoCurrencyModel"."id" 
        AND cp.currency_type_id = ${currencyType})`;

    return await CryptoCurrencyModel.findAll({
      where: { userId: data.userId },
      attributes: {
        include: [
          [literal(getSubQuery(PreferredCurrencyEnum.ars)), 'ars_price'],
          [literal(getSubQuery(PreferredCurrencyEnum.usd)), 'usd_price'],
          [literal(getSubQuery(PreferredCurrencyEnum.eur)), 'eur_price'],
        ],
      },
      order: [
        [literal(`${data.preferredCurrency}_price`), data.orderDirection],
      ],
      raw: true,
      nest: true,
      limit: data.limit,
    });
  }
}
