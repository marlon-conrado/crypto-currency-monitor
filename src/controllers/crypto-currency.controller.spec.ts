import { CryptoCurrencyController } from './crypto-currency.controller';
import { CryptoCurrencyService } from '../services';
import httpContext from 'express-http-context';

describe('CryptoCurrencyController', () => {
  let cryptoCurrencyController: CryptoCurrencyController;

  beforeEach(() => {
    cryptoCurrencyController = new CryptoCurrencyController();
  });

  describe('getAll', () => {
    it('should get all crypto currencies', async () => {
      jest
        .spyOn(CryptoCurrencyService.prototype, 'getAll')
        .mockResolvedValue('foo' as any);

      jest.spyOn(httpContext, 'get').mockResolvedValue({ id: 42312 });

      const result = await cryptoCurrencyController.getAll();
      expect(result).toBe('foo');
    });
  });
});
