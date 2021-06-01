import { injectable, environment } from '.';
import { ApiErrors } from './errors';

@injectable()
export class ApiResponse {
  public ERROR(res: any, error: Error) {
    let exception = {};

    if (environment.isDevelopment || environment.isTest) {
      exception =
        Object.keys(error)?.length > 0
          ? error
          : error?.toString() + ` ${error?.stack}`;
    }

    if (ApiErrors[error?.name]) {
      return res.status(400).json({
        error: {
          code: ApiErrors[error.name],
          exception,
        },
      });
    }

    return res.status(500).json({
      error: {
        code: ApiErrors.InternalError,
        exception,
      },
    });
  }

  public UNAUTHORIZED(res: any) {
    return res.status(401).json({
      error: {
        code: ApiErrors.Unauthorized,
      },
    });
  }

  public OK(res: any, data = {}) {
    return res.status(200).json({
      data,
    });
  }
}
