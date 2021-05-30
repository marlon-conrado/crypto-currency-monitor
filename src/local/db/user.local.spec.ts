import { UserLocal } from './user.local';
import { UserModel } from '../models';

describe('UserLocal', () => {
  let userLocal: UserLocal;
  beforeEach(() => {
    userLocal = new UserLocal();
  });

  describe('create', () => {
    it('should create user', async () => {
      jest.spyOn(UserModel.prototype, 'save').mockResolvedValue({
        get: () => 'test',
      } as any);

      const user = await userLocal.create({
        name: 'Marlon',
        lastName: 'Conrado',
        userName: 'elconrado',
        password: 'Marlon@123',
        preferredCurrencyId: 1,
      });

      expect(user).toEqual('test');
    });
  });

  describe('getByUserName', () => {
    it('get user by username', async () => {
      jest.spyOn(UserModel, 'findOne').mockResolvedValue('test' as any);

      expect(await userLocal.getByUserName('elconrado')).toEqual('test');
    });
  });
});
