import { SignInUserService } from './sign-in-user.service';
import { UserRepository, PasswordRepository } from '../repositories';

describe('SignInUserService', () => {
  let signInUserService: SignInUserService;

  beforeEach(() => {
    UserRepository.prototype.getByUserName = jest.fn();
    PasswordRepository.prototype.compare = jest.fn();

    signInUserService = new SignInUserService(
      UserRepository.prototype,
      PasswordRepository.prototype,
    );
  });

  describe('login', () => {
    it('should sign in user', async () => {
      jest.spyOn(UserRepository.prototype, 'getByUserName').mockResolvedValue({
        userName: 'elconrado',
        password: 'Marlon@123',
      } as any);

      jest
        .spyOn(PasswordRepository.prototype, 'compare')
        .mockResolvedValue(true);

      const user = await signInUserService.login({
        password: 'Marlon@123',
        userName: 'elconrado',
      });

      expect(user).toEqual({
        password: 'Marlon@123',
        userName: 'elconrado',
      });

      expect(UserRepository.prototype.getByUserName).toBeCalledWith(
        'elconrado',
      );
    });

    it('should throw error LoginDoesNotMatch when user is not found', async () => {
      jest
        .spyOn(UserRepository.prototype, 'getByUserName')
        .mockResolvedValue(null);

      try {
        await signInUserService.login({
          password: 'Marlon@123',
          userName: 'elconrado',
        });
      } catch (e) {
        expect(e.name).toEqual('LoginDoesNotMatch');
      }
    });

    it('should throw error LoginDoesNotMatch when password does not match', async () => {
      jest.spyOn(UserRepository.prototype, 'getByUserName').mockResolvedValue({
        userName: 'elconrado',
        password: 'Marlon@123',
      } as any);

      jest
        .spyOn(PasswordRepository.prototype, 'compare')
        .mockResolvedValue(false);

      try {
        await signInUserService.login({
          password: 'Marlon@123',
          userName: 'elconrado',
        });
      } catch (e) {
        expect(PasswordRepository.prototype.compare).toBeCalledWith(
          'Marlon@123',
          'Marlon@123',
        );
        expect(e.name).toEqual('LoginDoesNotMatch');
      }
    });
  });
});
