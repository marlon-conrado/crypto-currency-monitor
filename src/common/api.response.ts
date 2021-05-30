import { injectable, environment } from '.';
import { ApiErrors } from './errors';

@injectable()
export class ApiResponse {
  public Error(res: any, error: Error) {
    const exception = environment.isDevelopment ? error : {};

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

  public Ok(res: any, data = {}) {
    return res.status(200).json({
      data,
    });
  }
}
