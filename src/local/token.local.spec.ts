import { TokenLocal } from './token.local';
import jwt from 'jsonwebtoken';

describe('TokenLocal', () => {
  let tokenLocal: TokenLocal;
  beforeEach(() => {
    tokenLocal = new TokenLocal();
  });
  describe('sign', () => {
    it('should sign token', async () => {
      jest
        .spyOn(jwt, 'sign')
        .mockImplementation(
          (payload: any, privateKey: string, options: any, cb: any) => {
            cb(null, 'token');
          },
        );
      expect(await tokenLocal.sign({ id: 123 }, 'privatekey', '1h')).toBe(
        'token',
      );
    });
  });

  describe('verify', () => {
    it('should verify token', async () => {
      jest
        .spyOn(jwt, 'verify')
        .mockImplementation(
          (payload: any, privateKey: string, options: any, cb: any) => {
            cb(null, 'token');
          },
        );
      expect(await tokenLocal.verify('token', 'privatekey')).toBe('token');
    });
  });
});
