import Joi from 'joi';

export interface AddCryptoCurrencyDto {
  coinId: string;
}

export const AddCryptoCurrencyBodySchema = Joi.object({
  coinId: Joi.string().required(),
});
