import { PasswordRepository } from './password.repository';
import { HashPasswordLocal } from '../local';

describe('PasswordRepository', () => {
  let passwordRepository: PasswordRepository;

  beforeEach(() => {
    HashPasswordLocal.prototype.compare = jest.fn();
    passwordRepository = new PasswordRepository(HashPasswordLocal.prototype);
  });

  describe('compare', () => {
    it('should compare password', async () => {
      jest
        .spyOn(HashPasswordLocal.prototype, 'compare')
        .mockResolvedValue(true);

      expect(await passwordRepository.compare('pass1', 'pass1')).toBe(true);
    });
  });
});
