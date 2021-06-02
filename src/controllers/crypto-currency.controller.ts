import { Get, authMiddleware, container, Post } from '../shared';
import { CryptoCurrencyService, AddCryptoCurrencyService } from '../services';
import httpContext from 'express-http-context';

const cryptoCurrencyService = container.resolve(CryptoCurrencyService);
const addCryptoCurrencyService = container.resolve(AddCryptoCurrencyService);

export class CryptoCurrencyController {
  @Get('/crypto_currencies', [authMiddleware])
  async getAll() {
    const user = httpContext.get('user');

    return await cryptoCurrencyService.getAll({ userId: user.id });
  }

  @Post('/crypto_currency', [authMiddleware])
  async add(req: any) {
    const user = httpContext.get('user');
    const result = await addCryptoCurrencyService.add({
      userId: user.id,
      coinId: req.body.coinId,
    });

    delete result.id;

    return result;
  }
}
