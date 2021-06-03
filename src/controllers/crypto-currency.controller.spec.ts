import { CryptoCurrencyController } from './crypto-currency.controller';
import {
  CryptoCurrencyService,
  AddCryptoCurrencyService,
  GetTopCryptoCurrenciesService,
} from '../services';
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
      jest.spyOn(httpContext, 'get').mockReturnValue({ id: 42312 });

      const result = await cryptoCurrencyController.getAll();

      expect(result).toBe('foo');
      expect(CryptoCurrencyService.prototype.getAll).toBeCalledWith({
        userId: 42312,
      });
    });
  });

  describe('add', () => {
    it('should add crypto currency', async () => {
      jest
        .spyOn(AddCryptoCurrencyService.prototype, 'add')
        .mockResolvedValue({ id: 132, foo: 'foo' } as any);
      jest.spyOn(httpContext, 'get').mockReturnValue({ id: 42312 });

      const result = await cryptoCurrencyController.add({
        body: {
          coinId: 'bitcoin',
        },
      });
      expect(result).toEqual({ foo: 'foo' });
      expect(AddCryptoCurrencyService.prototype.add).toBeCalledWith({
        coinId: 'bitcoin',
        userId: 42312,
      });
    });

    it('should throw ValidationError to send invalid body', async () => {
      let error: any;
      try {
        await cryptoCurrencyController.add({
          body: {},
        } as any);
      } catch (e) {
        error = e;
      }

      expect(error.name).toBe('ValidationError');
    });
  });

  describe('getTop', () => {
    it('should get top crypto currencies', async () => {
      jest
        .spyOn(GetTopCryptoCurrenciesService.prototype, 'getTop')
        .mockResolvedValue('data' as any);
      jest.spyOn(httpContext, 'get').mockReturnValue({ id: 2 });

      const result = await cryptoCurrencyController.getTop({
        query: {
          limit: 12,
          order: 'asc',
        },
      });

      expect(result).toBe('data');
      expect(GetTopCryptoCurrenciesService.prototype.getTop).toBeCalledWith({
        amountRows: 12,
        orderDirection: 'asc',
        userId: 2,
      });
    });

    it('should get top currencies with default limit and order', async () => {
      jest
        .spyOn(GetTopCryptoCurrenciesService.prototype, 'getTop')
        .mockResolvedValue('data' as any);
      jest.spyOn(httpContext, 'get').mockReturnValue({ id: 2 });

      const result = await cryptoCurrencyController.getTop({
        query: {},
      });

      expect(result).toBe('data');
      expect(GetTopCryptoCurrenciesService.prototype.getTop).toBeCalledWith({
        amountRows: 25,
        orderDirection: 'desc',
        userId: 2,
      });
    });

    it('should throw error by invalid query params', async () => {
      jest
        .spyOn(GetTopCryptoCurrenciesService.prototype, 'getTop')
        .mockResolvedValue('data' as any);
      jest.spyOn(httpContext, 'get').mockReturnValue({ id: 2 });

      let error: Error;
      try {
        await cryptoCurrencyController.getTop({
          query: {
            limit: 24,
            order: '123',
          },
        });
      } catch (e) {
        error = e;
      }

      expect(error.name).toBe('ValidationError');
    });
  });
});
