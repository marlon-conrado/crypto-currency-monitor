import { CryptoCurrencyLocal } from './crypto-currency.local';
import { CryptoCurrencyModel } from '../models';

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
});
