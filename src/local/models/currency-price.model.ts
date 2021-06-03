import { Model, DataTypes } from 'sequelize';
import { database } from '../database.local';

export interface CurrencyPriceAttributes {
  id?: number;
  cryptoCurrencyId: number;
  currencyTypeId: number;
  price: number;
}

export class CurrencyPriceModel
  extends Model<CurrencyPriceAttributes, CurrencyPriceAttributes>
  implements CurrencyPriceAttributes
{
  id!: number;
  cryptoCurrencyId: number;
  currencyTypeId: number;
  price: number;
}

CurrencyPriceModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cryptoCurrencyId: {
      type: DataTypes.STRING,
      field: 'crypto_currency_id',
    },
    currencyTypeId: {
      type: DataTypes.STRING,
      field: 'currency_type_id',
    },
    price: {
      type: DataTypes.FLOAT,
    },
  },
  { tableName: 'currency_price', timestamps: false, sequelize: database },
);
