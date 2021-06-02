import { Model, DataTypes } from 'sequelize';
import { database } from '../database.local';

export interface CryptoCurrencyAttributes {
  id?: number;
  coinId: string;
  userId: number;
  symbol: string;
  name: string;
  image?: string;
  lastUpdated: string;
  arsPrice: number;
  usdPrice: number;
  eurPrice: number;
}

export class CryptoCurrencyModel
  extends Model<CryptoCurrencyAttributes, CryptoCurrencyAttributes>
  implements CryptoCurrencyAttributes
{
  id!: number;
  coinId: string;
  userId: number;
  symbol: string;
  name: string;
  image?: string;
  lastUpdated: string;
  arsPrice: number;
  usdPrice: number;
  eurPrice: number;
}

CryptoCurrencyModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    coinId: {
      type: DataTypes.STRING,
      field: 'coin_id',
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
    },
    symbol: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    lastUpdated: {
      type: DataTypes.DATE,
      field: 'last_updated',
    },
    arsPrice: {
      type: DataTypes.FLOAT,
      field: 'ars_price',
    },
    usdPrice: {
      type: DataTypes.FLOAT,
      field: 'usd_price',
    },
    eurPrice: {
      type: DataTypes.FLOAT,
      field: 'eur_price',
    },
  },
  { tableName: 'crypto_currency', timestamps: false, sequelize: database },
);
