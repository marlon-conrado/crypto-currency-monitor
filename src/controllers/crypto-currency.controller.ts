import {
  Get,
  authMiddleware,
  container,
  Post,
  ApplicationError,
  ApplicationErrors,
} from '../shared';
import { CryptoCurrencyService, AddCryptoCurrencyService } from '../services';
import httpContext from 'express-http-context';
import { AddCryptoCurrencyDto, AddCryptoCurrencyBodySchema } from '../dto';

const cryptoCurrencyService = container.resolve(CryptoCurrencyService);
const addCryptoCurrencyService = container.resolve(AddCryptoCurrencyService);

export class CryptoCurrencyController {
  @Get('/crypto_currencies', [authMiddleware])
  async getAll() {
    const user = httpContext.get('user');

    return await cryptoCurrencyService.getAll({ userId: user.id });
  }

  @Post('/crypto_currency', [authMiddleware])
  async add(req: { body: AddCryptoCurrencyDto }) {
    if (AddCryptoCurrencyBodySchema.validate(req.body).error) {
      throw new ApplicationError(ApplicationErrors.ValidationError);
    }

    const user = httpContext.get('user');
    const result = await addCryptoCurrencyService.add({
      userId: user.id,
      coinId: req.body.coinId,
    });

    delete result.id;

    return result;
  }
}
