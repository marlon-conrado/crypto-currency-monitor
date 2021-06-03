import { CurrencyPriceLocal } from './currency-price.local';
import { CurrencyPriceModel } from '../models';

describe('CurrencyPriceLocal', () => {
  let currencyPriceLocal: CurrencyPriceLocal;

  beforeEach(() => {
    currencyPriceLocal = new CurrencyPriceLocal();
  });

  describe('add', () => {
    it('should add currency price', async () => {
      jest.spyOn(CurrencyPriceModel.prototype, 'save').mockResolvedValue({
        get: () => 'foo',
      } as any);

      const result = await currencyPriceLocal.add({
        cryptoCurrencyId: 1,
        currencyTypeId: 2,
        price: 10000,
      });
      expect(CurrencyPriceModel.prototype.save).toBeCalledWith({});
      expect(result).toBe('foo');
    });
  });
});
