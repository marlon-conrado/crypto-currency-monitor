import { injectable, environment } from '.';
import { Errors } from '../errors/errors';

@injectable()
export class ApiError {
  BadRequest(res: any, error: Error) {
    const exception = environment.isDevelopment ? error : {};

    if (error?.name) {
      return res.status(400).json({ error: Errors[error.name], exception });
    }

    return res.status(400).json({ error: Errors.InternalError, exception });
  }
}
