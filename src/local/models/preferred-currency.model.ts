import { Model, DataTypes } from 'sequelize';
import { database } from '../database.local';
import { PreferredCurrencyNameEnum } from '../../shared';

export interface PreferredCurrencyAttributes {
  id?: number;
  name: PreferredCurrencyNameEnum;
  message: string;
}

export class CurrencyTypeModel
  extends Model<PreferredCurrencyAttributes, PreferredCurrencyAttributes>
  implements PreferredCurrencyAttributes
{
  id!: number;
  name: PreferredCurrencyNameEnum;
  message: string;
}

CurrencyTypeModel.init(
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
  { tableName: 'currency_type', timestamps: false, sequelize: database },
);
