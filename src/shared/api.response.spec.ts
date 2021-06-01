import { ApiResponse } from './api.response';
import { ApplicationError } from './application.error';
import { ApplicationErrors } from './errors/application.errors';

describe('ApiResponse', () => {
  let apiResponse: ApiResponse;
  beforeEach(() => {
    apiResponse = new ApiResponse();
  });

  describe('ERROR', () => {
    it('should response with custom error', () => {
      const fn = jest.fn();
      const res = {
        status: () => ({
          json: fn,
        }),
      };

      apiResponse.ERROR(
        res,
        new ApplicationError(ApplicationErrors.UserNotFound),
      );

      expect(fn).toBeCalledWith(
        expect.objectContaining({
          error: {
            code: 'E0004',
            exception: new ApplicationError(ApplicationErrors.UserNotFound),
          },
        }),
      );
    });

    it('should response with InternalError', () => {
      const fn = jest.fn();
      const res = {
        status: () => ({
          json: fn,
        }),
      };

      apiResponse.ERROR(res, new Error('Some Error'));
      const error = fn.mock.calls[0][0].error;

      expect(
        error.exception.includes('Error: Some Error Error: Some Error'),
      ).toBe(true);
      expect(error.code).toBe('InternalError');
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
      apiResponse.OK(res, { id: '#955' });
      expect(fn).toBeCalledWith({ data: { id: '#955' } });
    });
  });

  describe('UNAUTHORIZED', () => {
    it('should error unauthorized', () => {
      const fn = jest.fn();
      const res = {
        status: () => ({
          json: fn,
        }),
      };

      apiResponse.UNAUTHORIZED(res);
      expect(fn).toBeCalledWith({
        error: {
          code: 'Unauthorized',
        },
      });
    });
  });
});
