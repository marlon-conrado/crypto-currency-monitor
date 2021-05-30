import { app, ApiResponse } from '../';

function HttpMethod(method: string, uri: string, cb: any) {
  app[method](uri, async (req: any, res: any) => {
    try {
      const data = await cb(req);
      return new ApiResponse().Ok(res, data);
    } catch (e) {
      return new ApiResponse().BadRequest(res, e);
    }
  });
}

export function Post(uri: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    HttpMethod('post', uri, descriptor.value);
  };
}
