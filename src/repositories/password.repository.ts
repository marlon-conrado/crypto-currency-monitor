import { injectable } from '../shared';
import { HashPasswordLocal } from '../local';

@injectable()
export class PasswordRepository {
  constructor(private hashPasswordLocal: HashPasswordLocal) {}

  async compare(password: string, hash: string): Promise<boolean> {
    return await this.hashPasswordLocal.compare(password, hash);
  }
}
