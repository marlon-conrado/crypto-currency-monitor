import { ApiResponse } from '../api.response';
import { app } from '../../app';

export function HandleError(controller: any, pFunction: any) {
  return async function (req: any, res: any) {
    try {
      const data = await pFunction.apply(controller, [req, res]);
      return new ApiResponse().OK(res, data);
    } catch (e) {
      return new ApiResponse().ERROR(res, e);
    }
  };
}

export function Post(uri: string, middleWares = []) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    app.post(uri, ...middleWares, HandleError(target, descriptor.value));
  };
}

export function Get(uri: string, middleWares = []) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    app.get(uri, ...middleWares, HandleError(target, descriptor.value));
  };
}
