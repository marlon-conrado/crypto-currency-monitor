import { CryptoCurrencyService } from './crypto-currency.service';
import { UserRepository, CryptoCurrencyRepository } from '../repositories';

describe('CryptoCurrencyService', () => {
  let cryptoCurrencyService: CryptoCurrencyService;

  beforeEach(() => {
    cryptoCurrencyService = new CryptoCurrencyService(
      UserRepository.prototype,
      CryptoCurrencyRepository.prototype,
    );
  });
  describe('getAll', () => {
    it('should get crypto currencies', async () => {
      jest.spyOn(UserRepository.prototype, 'getById').mockResolvedValue({
        preferredCurrency: {
          name: 'ars',
        },
      } as any);

      jest
        .spyOn(CryptoCurrencyRepository.prototype, 'getCoinsMarkets')
        .mockResolvedValue([
          {
            id: 'bitcoin',
            symbol: 'symbol',
            name: 'name',
            image: 'image',
            last_updated: 'last_updated',
            current_price: 'current_price',
          },
        ]);

      const result = await cryptoCurrencyService.getAll({ userId: 123 });
      expect(UserRepository.prototype.getById).toBeCalledWith(123);
      expect(CryptoCurrencyRepository.prototype.getCoinsMarkets).toBeCalledWith(
        'ars',
      );
      expect(result).toEqual([
        {
          coinId: 'bitcoin',
          image: 'image',
          lastUpdated: 'last_updated',
          name: 'name',
          price: 'current_price',
          symbol: 'symbol',
        },
      ]);
    });
  });
});
