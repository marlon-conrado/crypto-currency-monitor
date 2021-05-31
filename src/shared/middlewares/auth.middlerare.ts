import { TokenLocal } from '../../local';
import { environment } from '../environment';
import { ApiResponse } from '../api.response';
import httpContext from 'express-http-context';

export async function authMiddleware(
  req: any,
  res: any,
  next: any,
): Promise<void> {
  try {
    const token = req.headers.token;
    const payload = await new TokenLocal().verify(
      token,
      environment.token.privateKey,
    );

    httpContext.set('user', payload);

    next();
  } catch (e) {
    new ApiResponse().UNAUTHORIZED(res);
  }
}
