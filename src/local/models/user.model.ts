import { database } from '../database.local';
import { Model, Optional, DataTypes } from 'sequelize';
import {
  CurrencyTypeModel,
  PreferredCurrencyAttributes,
} from './preferred-currency.model';

export interface UserAttributes {
  id?: number;
  name: string;
  lastName: string;
  userName: string;
  password: string;
  preferredCurrencyId: number;
  createdAt?: string;
  updatedAt?: string;
  preferredCurrency?: PreferredCurrencyAttributes;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class UserModel
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  id!: number;
  name: string;
  lastName: string;
  userName: string;
  password: string;
  preferredCurrencyId: number;
  createdAt!: string;
  updatedAt!: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
    },
    name: {
      type: DataTypes.STRING,
    },
    userName: {
      type: DataTypes.STRING,
      field: 'user_name',
    },
    password: {
      type: DataTypes.STRING,
    },
    preferredCurrencyId: {
      type: DataTypes.INTEGER,
      field: 'preferred_currency_id',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
      allowNull: false,
    },
  },
  { tableName: 'user', timestamps: true, sequelize: database },
);

UserModel.belongsTo(CurrencyTypeModel, {
  targetKey: 'id',
  foreignKey: 'preferred_currency_id',
  as: 'preferredCurrency',
});

CurrencyTypeModel.hasMany(UserModel, {
  sourceKey: 'id',
  foreignKey: 'preferred_currency_id',
  as: 'preferredCurrency',
});
