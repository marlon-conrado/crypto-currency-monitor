import Joi from 'joi';

export const LoginDto = Joi.object({
  password: Joi.string().alphanum().min(8).max(20).required(),
  userName: Joi.string().required(),
});
