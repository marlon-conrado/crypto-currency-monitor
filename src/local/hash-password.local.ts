import bcrypt from 'bcrypt';
import { environment, injectable } from '../common';

@injectable()
export class HashPasswordLocal {
  public async hash(password: string): Promise<string> {
    const salt = await this.genSalt();

    return new Promise((resolve, reject) => {
      bcrypt.hash(password, salt, (error: Error, hash: string) => {
        if (error) {
          return reject(error);
        }

        return resolve(hash);
      });
    });
  }

  public compare(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      });
    });
  }

  private genSalt(): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(environment.saltRounds, (error: Error, salt: string) => {
        if (error) {
          return reject(error);
        }

        return resolve(salt);
      });
    });
  }
}
