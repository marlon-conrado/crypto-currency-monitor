import Joi from 'joi';
import { PreferredCurrencyEnum } from '../shared';

export interface SignUpDto {
  password: string;
  lastName: string;
  name: string;
  userName: string;
  preferredCurrency: number;
}

export const SignUpBodySchema = Joi.object<SignUpDto>({
  password: Joi.string().alphanum().min(8).max(20).required(),
  lastName: Joi.string().required(),
  name: Joi.string().required(),
  userName: Joi.string().required(),
  preferredCurrency: Joi.custom((value: number) => {
    const isValid = [
      PreferredCurrencyEnum.ars,
      PreferredCurrencyEnum.eur,
      PreferredCurrencyEnum.usd,
    ].includes(value);

    if (!isValid) {
      throw new Error('ErrorPreferredCurrency');
    }
  }),
});
