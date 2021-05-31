import { authMiddleware } from './auth.middlerare';
import { TokenLocal } from '../../local';
import { ApiResponse } from '../api.response';

describe('authMiddleware', () => {
  it('should pass auth validation', async () => {
    jest
      .spyOn(TokenLocal.prototype, 'verify')
      .mockReturnValue(Promise.resolve('resolved'));
    const next = jest.fn();

    await authMiddleware(
      {
        headers: {
          token: 'token',
        },
      },
      {},
      next,
    );
    expect(TokenLocal.prototype.verify).toBeCalledWith('token', 'M123456');
    expect(next).toBeCalled();
  });

  it('should not pass auth validation', async () => {
    jest
      .spyOn(TokenLocal.prototype, 'verify')
      .mockReturnValue(Promise.reject(new Error('token')));

    jest.spyOn(ApiResponse.prototype, 'UNAUTHORIZED').mockReturnValue('');

    const next = jest.fn();

    await authMiddleware(
      {
        headers: {
          token: 'token',
        },
      },
      {},
      next,
    );

    expect(ApiResponse.prototype.UNAUTHORIZED).toBeCalledWith({});
  });
});
