import jwt from 'jsonwebtoken';
import util from 'util';
import { injectable } from '../shared';

@injectable()
export class TokenLocal {
  async sign(
    payload: any,
    privateKey: string,
    expiresIn: string,
  ): Promise<string> {
    const auxSign = util.promisify<any, string, any, string>(jwt.sign);

    return await auxSign(payload, privateKey, { expiresIn });
  }

  async verify(token: string, privateKey: string): Promise<string> {
    const auxVerify = util.promisify<string, string, any, string>(jwt.verify);

    return await auxVerify(token, privateKey, {});
  }
}
