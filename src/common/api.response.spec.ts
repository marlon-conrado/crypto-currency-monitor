import { ApiResponse } from './api.response';
import { ApplicationError } from './application.error';
import { ApplicationErrors } from './errors/application.errors';

describe('ApiResponse', () => {
  let apiResponse: ApiResponse;
  beforeEach(() => {
    apiResponse = new ApiResponse();
  });

  describe('Error', () => {
    it('should response with custom error', () => {
      const fn = jest.fn();
      const res = {
        status: () => ({
          json: fn,
        }),
      };

      apiResponse.Error(
        res,
        new ApplicationError(ApplicationErrors.UserNotFound),
      );

      expect(fn).toBeCalledWith({
        error: { code: 'E0004', exception: {} },
      });
    });

    it('should response with InternalError', () => {
      const fn = jest.fn();
      const res = {
        status: () => ({
          json: fn,
        }),
      };

      apiResponse.Error(res, new Error('Some Error'));

      expect(fn).toBeCalledWith({
        error: { code: 'InternalError', exception: {} },
      });
    });
  });

  describe('OK', () => {
    it('should send data', () => {
      const fn = jest.fn();
      const res = {
        status: () => ({
          json: fn,
        }),
      };
      apiResponse.Ok(res, { id: '#955' });
      expect(fn).toBeCalledWith({ data: { id: '#955' } });
    });
  });
});
