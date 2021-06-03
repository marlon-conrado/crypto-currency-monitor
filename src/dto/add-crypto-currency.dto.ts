import Joi from 'joi';

export interface AddCryptoCurrencyDto {
  coinId: string;
}

export const AddCryptoCurrencyBodySchema = Joi.object<AddCryptoCurrencyDto>({
  coinId: Joi.string().required(),
});
