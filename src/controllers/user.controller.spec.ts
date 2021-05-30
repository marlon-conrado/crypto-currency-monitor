import { UserController } from './user.controller';
import { SignUpUserService } from '../services';
import { ApiResponse } from '../common';

describe('UserController', () => {
  beforeEach(() => {
    SignUpUserService.prototype.signUp = jest.fn();
    ApiResponse.prototype.Created = jest.fn();
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

      await new UserController().createUser(req);
      expect(SignUpUserService.prototype.signUp).toBeCalledWith({
        lastName: 'Conrado',
        name: 'Marlon',
        password: 'Marlon@123',
        preferredCurrencyId: 3,
        userName: 'elconrado',
      });

      expect(ApiResponse.prototype.Created).toBeCalledWith(
        {},
        { id: 1, userName: 'elconrado' },
      );
    });
  });
});
