import { UserRepository } from './user.repository';
import { UserLocal, HashPasswordLocal } from '../local';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  beforeEach(() => {
    UserLocal.prototype.create = jest.fn();
    HashPasswordLocal.prototype.hash = jest.fn();

    userRepository = new UserRepository(
      UserLocal.prototype,
      HashPasswordLocal.prototype,
    );
  });

  describe('create', () => {
    it('should create user', async () => {
      jest
        .spyOn(HashPasswordLocal.prototype, 'hash')
        .mockResolvedValue(
          '$2b$10$C3bDJknUiZ32dUrp/v3ZWOfijf4lx0dc89fiJ8z6osJELZh/BcpJ2',
        );

      jest
        .spyOn(UserLocal.prototype, 'create')
        .mockResolvedValue('test' as any);

      const user = await userRepository.create({
        name: 'Marlon',
        lastName: 'Conrado',
        userName: 'elconrado',
        password: 'Marlon@123',
      } as any);

      expect(HashPasswordLocal.prototype.hash).toBeCalledWith('Marlon@123');
      expect(UserLocal.prototype.create).toBeCalledWith({
        lastName: 'Conrado',
        name: 'Marlon',
        password:
          '$2b$10$C3bDJknUiZ32dUrp/v3ZWOfijf4lx0dc89fiJ8z6osJELZh/BcpJ2',
        userName: 'elconrado',
      });
      expect(user).toBe('test');
    });
  });

  describe('getByUserName', () => {
    it('should get user by user name', async () => {
      jest
        .spyOn(UserLocal.prototype, 'getByUserName')
        .mockResolvedValue('test' as any);

      const user = await userRepository.getByUserName('elconrado');

      expect(UserLocal.prototype.getByUserName).toBeCalled();
      expect(user).toBe('test');
    });
  });

  describe('getByUserName', () => {
    it('should get user by user name', async () => {
      jest
        .spyOn(UserLocal.prototype, 'getById')
        .mockResolvedValue('test' as any);

      const user = await userRepository.getById(123);

      expect(UserLocal.prototype.getById).toBeCalled();
      expect(user).toBe('test');
    });
  });
});
