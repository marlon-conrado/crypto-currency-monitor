import bcrypt from 'bcrypt';
import { environment, injectable } from '../shared';
import util from 'util';

@injectable()
export class HashPasswordLocal {
  public async hash(password: string): Promise<string> {
    const salt = await this.genSalt();
    const auxHash = util.promisify<string, string, string>(bcrypt.hash);

    return await auxHash(password, salt);
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    const auxCompare = util.promisify<string, string, boolean>(bcrypt.compare);
    return await auxCompare(password, hash);
  }

  private async genSalt(): Promise<string> {
    const auxGenSalt = util.promisify<number, string>(bcrypt.genSalt);
    return await auxGenSalt(environment.saltRounds);
  }
}
