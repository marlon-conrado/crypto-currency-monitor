import { TokenRepository } from './token.repository';
import { TokenLocal } from '../local';

describe('TokenRepository', () => {
  let tokenRepository: TokenRepository;

  beforeEach(() => {
    TokenLocal.prototype.sign = jest.fn();
    tokenRepository = new TokenRepository(TokenLocal.prototype);
  });

  describe('sign', () => {
    it('should create token', async () => {
      jest.spyOn(TokenLocal.prototype, 'sign').mockResolvedValue('token');

      expect(await tokenRepository.sign({ id: 123 })).toBe('token');
    });
  });
});
