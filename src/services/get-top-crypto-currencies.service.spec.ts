import { GetTopCryptoCurrenciesService } from './get-top-crypto-currencies.service';
import { CryptoCurrencyRepository, UserRepository } from '../repositories';

describe('GetTopCryptoCurrenciesService', () => {
  let getTopCryptoCurrenciesService: GetTopCryptoCurrenciesService;

  beforeEach(() => {
    getTopCryptoCurrenciesService = new GetTopCryptoCurrenciesService(
      CryptoCurrencyRepository.prototype,
      UserRepository.prototype,
    );
  });

  describe('getTop', () => {
    it('should get top crypto currencies', async () => {
      jest.spyOn(UserRepository.prototype, 'getById').mockResolvedValue({
        id: 455,
        preferredCurrency: {
          name: 'ars',
        },
      } as any);

      jest
        .spyOn(CryptoCurrencyRepository.prototype, 'getTop')
        .mockResolvedValue([
          {
            symbol: 'symbol',
            ars_price: 1000,
            usd_price: 1000,
            eur_price: 1000,
            name: 'name',
            image: 'image',
            lastUpdated: 'lastUpdated',
          },
        ] as any);

      const result = await getTopCryptoCurrenciesService.getTop({
        userId: 455,
        amountRows: 10,
        orderDirection: 'desc',
      });

      expect(UserRepository.prototype.getById).toBeCalledWith(455);
      expect(CryptoCurrencyRepository.prototype.getTop).toBeCalledWith({
        limit: 10,
        orderDirection: 'desc',
        preferredCurrency: 'ars',
        userId: 455,
      });
      expect(result).toEqual([
        {
          ars_price: 1000,
          eur_price: 1000,
          image: 'image',
          last_updated: 'lastUpdated',
          name: 'name',
          symbol: 'symbol',
          usd_price: 1000,
        },
      ]);
    });
  });
});
