import { HashPasswordLocal } from './hash-password.local';
import bcrypt from 'bcrypt';

describe('HashPasswordLocal', () => {
  let hashPasswordLocal: HashPasswordLocal;
  beforeEach(() => {
    bcrypt.compare = jest.fn();
    bcrypt.genSalt = jest.fn();
    bcrypt.hash = jest.fn();

    hashPasswordLocal = new HashPasswordLocal();
  });

  describe('hash', () => {
    it('should hash password', async () => {
      jest
        .spyOn(bcrypt, 'genSalt')
        .mockImplementation((saltRounds: number, cb: any): void => {
          cb(null, 'salt');
        });

      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation((password: string, salt: string, cb: any): void => {
          cb(null, 'passwordhash');
        });

      expect(await hashPasswordLocal.hash('Marlon@123')).toBe('passwordhash');
      expect(bcrypt.genSalt).toBeCalled();
    });
  });

  describe('compare', () => {
    it('should response true to compare password with hash', async () => {
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation((password: string, hash: string, cb): void => {
          cb(null, true);
        });

      expect(await hashPasswordLocal.compare('password', 'hashpassword'));
    });
  });
});
