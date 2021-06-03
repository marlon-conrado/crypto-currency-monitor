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
  },
  { tableName: 'crypto_currency', timestamps: false, sequelize: database },
);
