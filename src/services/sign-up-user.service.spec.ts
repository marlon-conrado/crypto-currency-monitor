import { SignUpUserService } from './sign-up-user.service';
import { UserRepository } from '../repositories';

describe('SignUpUserService', () => {
  let signUpUserService: SignUpUserService;

  beforeEach(() => {
    UserRepository.prototype.getByUserName = jest.fn();
    signUpUserService = new SignUpUserService(UserRepository.prototype);
  });

  describe('signUp', () => {
    it('should create user', async () => {
      const mockUser = {
        password: 'Marlon@123',
        userName: 'elconrado',
        name: 'Marlon',
        lastName: 'Conrado',
      };

      jest
        .spyOn(UserRepository.prototype, 'create')
        .mockResolvedValue(mockUser as any);

      const user = await signUpUserService.signUp(mockUser as any);

      expect(UserRepository.prototype.create).toBeCalledWith(mockUser);

      expect(user).toEqual(mockUser);
    });
  });
});
