import { CryptoCurrencyLocal } from './crypto-currency.local';
import { CryptoCurrencyModel } from '../models';
import { PreferredCurrencyNameEnum } from 'src/shared';

describe('CryptoCurrencyLocal', () => {
  let cryptoCurrencyLocal: CryptoCurrencyLocal;

  beforeEach(() => {
    cryptoCurrencyLocal = new CryptoCurrencyLocal();
  });
  describe('add', () => {
    it('should add crypto currency', async () => {
      jest.spyOn(CryptoCurrencyModel.prototype, 'save').mockResolvedValue({
        get: () => 'foo',
      } as never);

      expect(
        await cryptoCurrencyLocal.add({
          foo: 'foo',
        } as any),
      ).toEqual('foo');
    });
  });

  describe('getTop', () => {
    it('should get top crypt currencies', async () => {
      jest
        .spyOn(CryptoCurrencyModel, 'findAll')
        .mockResolvedValue('foo' as any);

      const result = await cryptoCurrencyLocal.getTop({
        limit: 25,
        orderDirection: 'desc',
        preferredCurrency: 'ars' as PreferredCurrencyNameEnum,
        userId: 22,
      });

      expect(result).toBe('foo');
      expect(CryptoCurrencyModel.findAll).toBeCalledWith(
        expect.objectContaining({
          limit: 25,
          nest: true,
          order: [[{ val: 'ars_price' }, 'desc']],
          raw: true,
          where: { userId: 22 },
        }),
      );
    });
  });
});
