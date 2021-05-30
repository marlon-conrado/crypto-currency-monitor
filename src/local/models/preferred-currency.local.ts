import { Model, DataTypes } from 'sequelize';
import { database } from '../database.local';

export interface PreferredCurrencyAttributes {
  id?: number;
  name: string;
  message: string;
}

export class PreferredCurrencyModel
  extends Model<PreferredCurrencyAttributes, PreferredCurrencyAttributes>
  implements PreferredCurrencyAttributes
{
  id!: number;
  name: string;
  message: string;
}

PreferredCurrencyModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.STRING,
    },
  },
  { tableName: 'preferred_currency', timestamps: false, sequelize: database },
);
