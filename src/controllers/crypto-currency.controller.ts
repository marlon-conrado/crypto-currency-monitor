import { Get } from '../common';

export class CryptoCurrencyController {
  @Get('/crypto_currency')
  get() {
    return 'Hello!';
  }
}
