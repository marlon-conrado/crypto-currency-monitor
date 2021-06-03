import Joi from 'joi';
export interface GetTopCryptoCurrencyDto {
  limit?: number;
  order?: string;
}

export const GetTopCryptoCurrencyQuerySchema =
  Joi.object<GetTopCryptoCurrencyDto>({
    limit: Joi.number().optional().max(25),
    order: Joi.string().pattern(/^desc|asc$/),
  });
