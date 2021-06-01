import { CryptoCurrencyRepository } from './crypto-currency.repository';
import { ApiRemote } from '../remote';

describe('CryptoCurrencyRepository', () => {
  let cryptoCurrencyRepository: CryptoCurrencyRepository;

  beforeEach(() => {
    cryptoCurrencyRepository = new CryptoCurrencyRepository(
      ApiRemote.prototype,
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
});
