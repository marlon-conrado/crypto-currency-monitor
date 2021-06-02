import { CryptoCurrencyController } from './crypto-currency.controller';
import { CryptoCurrencyService, AddCryptoCurrencyService } from '../services';
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

  describe('add', () => {
    it('should add crypto currency', async () => {
      jest
        .spyOn(AddCryptoCurrencyService.prototype, 'add')
        .mockResolvedValue({ id: 132, foo: 'foo' } as any);

      jest.spyOn(httpContext, 'get').mockResolvedValue({ id: 42312 });

      const result = await cryptoCurrencyController.add({
        body: {
          coinId: 'bitcoin',
        },
      });
      expect(result).toEqual({ foo: 'foo' });
    });
  });
});
