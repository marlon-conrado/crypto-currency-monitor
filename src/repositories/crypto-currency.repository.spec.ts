import { CryptoCurrencyRepository } from './crypto-currency.repository';
import { ApiRemote } from '../remote';
import { CryptoCurrencyLocal } from '../local';

describe('CryptoCurrencyRepository', () => {
  let cryptoCurrencyRepository: CryptoCurrencyRepository;

  beforeEach(() => {
    cryptoCurrencyRepository = new CryptoCurrencyRepository(
      ApiRemote.prototype,
      CryptoCurrencyLocal.prototype,
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
        .mockResolvedValue('foo' as any);

      const result = await cryptoCurrencyRepository.add({
        coinId: 'bitcoin',
        userId: 652,
      });

      expect(result).toBe('foo');
    });
  });
});
