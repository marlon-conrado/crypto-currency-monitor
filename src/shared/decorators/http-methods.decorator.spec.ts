import { HandleError } from './http-methods.decorator';
import { ApiResponse } from '../api.response';

describe('HandleError', () => {
  it('should response OK', async () => {
    jest.spyOn(ApiResponse.prototype, 'OK').mockResolvedValue('foo');

    class FooController {}

    const req = { name: 'req' };
    const res = { name: 'res' };
    const httpResolver = jest.fn().mockResolvedValue('foo');

    await HandleError(FooController, httpResolver)(req, res);

    expect(ApiResponse.prototype.OK).toBeCalledWith({ name: 'res' }, 'foo');
  });

  it('should response with ERROR', async () => {
    jest.spyOn(ApiResponse.prototype, 'ERROR').mockResolvedValue('foo');

    class FooController {}

    const req = { name: 'req' };
    const res = { name: 'res' };
    const httpResolver = jest.fn().mockRejectedValue(new Error('error'));

    await HandleError(FooController, httpResolver)(req, res);

    expect(ApiResponse.prototype.ERROR).toBeCalledWith(
      { name: 'res' },
      new Error('error'),
    );
  });
});
