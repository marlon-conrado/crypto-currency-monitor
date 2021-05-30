import { Model, Optional } from 'sequelize';
import { PreferredCurrencyAttributes } from './preferred-currency.local';
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
export declare type UserCreationAttributes = Optional<UserAttributes, 'id'>;
export declare class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id: number;
    name: string;
    lastName: string;
    userName: string;
    password: string;
    preferredCurrencyId: number;
    createdAt: string;
    updatedAt: string;
}
