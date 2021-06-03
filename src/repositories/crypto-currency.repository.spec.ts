import { CryptoCurrencyRepository } from './crypto-currency.repository';
import { ApiRemote } from '../remote';
import { CryptoCurrencyLocal, CurrencyPriceLocal } from '../local';
import { database } from '../local/database.local';

describe('CryptoCurrencyRepository', () => {
  let cryptoCurrencyRepository: CryptoCurrencyRepository;

  beforeEach(() => {
    cryptoCurrencyRepository = new CryptoCurrencyRepository(
      ApiRemote.prototype,
      CryptoCurrencyLocal.prototype,
      CurrencyPriceLocal.prototype,
    );
  });

  describe('getCoinsMarkets', () => {
    it('should get available coins markets by preferred currency', async () => {
      jest.spyOn(ApiRemote.prototype, 'get').mockResolvedValue({
        data: 'foo',
      });

      await cryptoCurrencyRepository.getCoinsMarkets('ars');
      expect(ApiRemote.prototype.get).toBeCalledWith(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency={q.vsCurrency}',
        { query: { vsCurrency: 'ars' } },
      );
    });
  });

  describe('add', () => {
    it('should add crypto currency', async () => {
      jest.spyOn(ApiRemote.prototype, 'get').mockResolvedValue({
        data: {
          id: 'id',
          name: 'name',
          symbol: 'symbol',
          market_data: {
            current_price: {
              ars: 10000,
              usd: 10000,
              eur: 10000,
            },
          },
          last_updated: 'last_updated',
          image: { large: 'large' },
        },
      });

      jest
        .spyOn(CryptoCurrencyLocal.prototype, 'add')
        .mockResolvedValue({ id: '255' } as any);

      jest
        .spyOn(CurrencyPriceLocal.prototype, 'add')
        .mockResolvedValue('foo' as any);

      jest.spyOn(database, 'transaction').mockImplementation((cb: any) => {
        const t = { transaction: 'transaction' };
        return cb(t);
      });

      const result = await cryptoCurrencyRepository.add({
        coinId: 'bitcoin',
        userId: 652,
      });

      expect(result).toEqual({ id: '255' });
      expect(CryptoCurrencyLocal.prototype.add).toBeCalledTimes(1);
      expect(CryptoCurrencyLocal.prototype.add).toBeCalledWith(
        {
          coinId: 'id',
          image: 'large',
          lastUpdated: 'last_updated',
          name: 'name',
          symbol: 'symbol',
          userId: 652,
        },
        { transaction: 'transaction' },
      );
      expect(CurrencyPriceLocal.prototype.add).toBeCalledTimes(3);

      expect((CurrencyPriceLocal.prototype.add as any).mock.calls).toEqual([
        [
          { price: 10000, currencyTypeId: 1, cryptoCurrencyId: '255' },
          { transaction: 'transaction' },
        ],
        [
          { price: 10000, currencyTypeId: 3, cryptoCurrencyId: '255' },
          { transaction: 'transaction' },
        ],
        [
          { price: 10000, currencyTypeId: 2, cryptoCurrencyId: '255' },
          { transaction: 'transaction' },
        ],
      ]);
    });
  });

  describe('getTop', () => {
    it('should get top currencies', async () => {
      jest
        .spyOn(CryptoCurrencyLocal.prototype, 'getTop')
        .mockResolvedValue('foo' as any);

      const result = await cryptoCurrencyRepository.getTop('foo' as any);

      expect(result).toBe('foo');
      expect(CryptoCurrencyLocal.prototype.getTop).toBeCalledWith('foo');
    });
  });
});
