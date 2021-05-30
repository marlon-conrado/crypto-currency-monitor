import { Model } from 'sequelize';
export interface PreferredCurrencyAttributes {
    id?: number;
    name: string;
    message: string;
}
export declare class PreferredCurrencyModel extends Model<PreferredCurrencyAttributes, PreferredCurrencyAttributes> implements PreferredCurrencyAttributes {
    id: number;
    name: string;
    message: string;
}
