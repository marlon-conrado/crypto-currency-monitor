import { ApiRemote } from './api.remote';
import axios from 'axios';

describe('ApiRemote', () => {
  let apiRemote: ApiRemote;
  beforeEach(() => {
    apiRemote = new ApiRemote();
  });

  describe('get', () => {
    it('should request with get method', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue({ data: 'foo' });

      await apiRemote.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency={q.vsCurrency}',
        {
          query: {
            vsCurrency: 'ars',
          },
          body: {
            name: 'stuff',
          },
        },
      );

      expect(axios.get).toBeCalledWith(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=ars',
        { name: 'stuff' },
      );
    });
  });
});
