import { injectable, environment } from '.';
import { Errors } from './errors';

@injectable()
export class ApiResponse {
  public BadRequest(res: any, error: Error) {
    const exception = environment.isDevelopment ? error : {};

    if (Errors[error?.name]) {
      return res.status(400).json({
        code: Errors[error.name],
        exception,
      });
    }

    return res.status(400).json({
      code: Errors.InternalError,
      exception,
    });
  }

  public Created(res: any, data = {}) {
    return res.status(201).json({
      data,
    });
  }

  public Ok(res: any, data = {}) {
    return res.status(200).json({
      data,
    });
  }
}
