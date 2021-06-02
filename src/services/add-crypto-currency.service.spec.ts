import { AddCryptoCurrencyService } from './add-crypto-currency.service';
import { CryptoCurrencyRepository } from '../repositories';
import { ApplicationError, ApplicationErrors } from '../shared';

describe('AddCryptoCurrencyService', () => {
  let addCryptoCurrencyService: AddCryptoCurrencyService;

  beforeEach(() => {
    addCryptoCurrencyService = new AddCryptoCurrencyService(
      CryptoCurrencyRepository.prototype,
    );
  });

  describe('add', () => {
    it('should add crypto currency', async () => {
      jest
        .spyOn(CryptoCurrencyRepository.prototype, 'add')
        .mockResolvedValue('foo' as any);

      const result = await addCryptoCurrencyService.add({
        userId: 123,
        coinId: 'bitcoin',
      });

      expect(result).toBe('foo');
    });

    it('should throw error CoinNotFound', async () => {
      jest
        .spyOn(CryptoCurrencyRepository.prototype, 'add')
        .mockImplementation(() =>
          Promise.reject({ response: { status: 404 } }),
        );

      let error: any;
      try {
        await addCryptoCurrencyService.add({
          userId: 123,
          coinId: 'bitcoin',
        });
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(
        new ApplicationError(ApplicationErrors.CoinNotFound),
      );
    });

    it('should throw error', async () => {
      jest
        .spyOn(CryptoCurrencyRepository.prototype, 'add')
        .mockImplementation(() => Promise.reject(new Error('foo')));

      let error: any;
      try {
        await addCryptoCurrencyService.add({
          userId: 123,
          coinId: 'bitcoin',
        });
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new Error('foo'));
    });
  });
});
