import { TokenLocal } from '../local';
import { environment, injectable } from '../shared';

@injectable()
export class TokenRepository {
  constructor(private tokenLocal: TokenLocal) {}

  async sign(
    payload: any,
    privateKey = environment.token.privateKey,
    expiresIn = environment.token.expiresIn,
  ): Promise<string> {
    return await this.tokenLocal.sign(payload, privateKey, expiresIn);
  }
}
