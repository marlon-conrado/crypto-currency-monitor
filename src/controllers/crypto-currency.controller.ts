import { Get, authMiddleware, container } from '../shared';
import { CryptoCurrencyService } from '../services';
import httpContext from 'express-http-context';

const cryptoCurrencyService = container.resolve(CryptoCurrencyService);

export class CryptoCurrencyController {
  @Get('/crypto_currencies', [authMiddleware])
  async getAll() {
    const user = httpContext.get('user');

    return await cryptoCurrencyService.getAll({ userId: user.id });
  }
}
