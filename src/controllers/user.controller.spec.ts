import { UserController } from './user.controller';
import { SignUpUserService, SignInUserService } from '../services';

describe('UserController', () => {
  let userController: UserController;
  beforeEach(() => {
    SignUpUserService.prototype.signUp = jest.fn();
    SignInUserService.prototype.signIn = jest.fn();
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
          password: 'Marlon123',
          userName: 'elconrado',
          preferredCurrency: 3,
        },
      };

      await userController.createUser(req);
      expect(SignUpUserService.prototype.signUp).toBeCalledWith({
        lastName: 'Conrado',
        name: 'Marlon',
        password: 'Marlon123',
        preferredCurrencyId: 3,
        userName: 'elconrado',
      });
    });

    it('should return back error by invalid body', async () => {
      try {
        await userController.createUser({
          body: {
            name: 'Marlon',
            lastName: 'Conrado',
            password: 'Marlon123',
            userName: 'elconrado',
            preferredCurrency: 4,
          },
        });
      } catch (e) {
        expect(e.name).toBe('ValidationError');
      }
    });
  });

  describe('signIn', () => {
    it('should login user', async () => {
      const req = {
        body: {
          password: 'Marlon123',
          userName: 'elconrado',
        },
      };

      jest.spyOn(SignInUserService.prototype, 'signIn').mockResolvedValue({
        token: 'token',
      } as any);

      const data = await userController.signIn(req);

      expect(SignInUserService.prototype.signIn).toBeCalledWith({
        password: 'Marlon123',
        userName: 'elconrado',
      });

      expect(data).toEqual({ token: 'token' });
    });

    it('should return back error by invalid body', async () => {
      let error: any;
      try {
        await userController.signIn({
          body: {
            userName: 'hello',
            password: 'thing@123',
          },
        });
      } catch (e) {
        error = e;
      }
      expect(error.name).toBe('ValidationError');
    });
  });
});
