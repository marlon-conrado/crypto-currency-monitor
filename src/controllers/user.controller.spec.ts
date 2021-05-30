import { UserController } from './user.controller';
import { SignUpUserService, SignInUserService } from '../services';

describe('UserController', () => {
  let userController: UserController;
  beforeEach(() => {
    SignUpUserService.prototype.signUp = jest.fn();
    SignInUserService.prototype.login = jest.fn();
    userController = new UserController();
  });

  describe('createUser', () => {
    it('should create user', async () => {
      jest
        .spyOn(SignUpUserService.prototype, 'signUp')
        .mockResolvedValue({ id: 1, userName: 'elconrado' } as any);

      const req = {
        body: {
          name: 'Marlon',
          lastName: 'Conrado',
          password: 'Marlon@123',
          userName: 'elconrado',
          preferredCurrency: 3,
        },
      };

      await userController.createUser(req);
      expect(SignUpUserService.prototype.signUp).toBeCalledWith({
        lastName: 'Conrado',
        name: 'Marlon',
        password: 'Marlon@123',
        preferredCurrencyId: 3,
        userName: 'elconrado',
      });
    });
  });

  describe('login', () => {
    it('should login user', async () => {
      const req = {
        body: {
          name: 'Marlon',
          lastName: 'Conrado',
          password: 'Marlon@123',
          userName: 'elconrado',
          preferredCurrency: 3,
        },
      };

      jest.spyOn(SignInUserService.prototype, 'login').mockResolvedValue({
        password: 'pass123',
        name: 'Marlon',
        lastName: 'Conrado',
      } as any);

      const data = await userController.login(req);

      expect(SignInUserService.prototype.login).toBeCalledWith({
        lastName: 'Conrado',
        name: 'Marlon',
        password: 'Marlon@123',
        preferredCurrency: 3,
        userName: 'elconrado',
      });

      expect(data).toEqual({
        lastName: 'Conrado',
        name: 'Marlon',
      });
    });
  });
});
