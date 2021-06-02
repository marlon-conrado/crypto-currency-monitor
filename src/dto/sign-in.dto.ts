import Joi from 'joi';

export interface SignInDto {
  password: string;
  userName: string;
}

export const SignInBodySchema = Joi.object({
  password: Joi.string().alphanum().min(8).max(20).required(),
  userName: Joi.string().required(),
});
