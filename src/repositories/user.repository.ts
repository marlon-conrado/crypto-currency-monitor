import { injectable } from '../shared';
import { UserLocal, HashPasswordLocal, UserAttributes } from '../local';

@injectable()
export class UserRepository {
  constructor(
    private userLocal: UserLocal,
    private hashPasswordLocal: HashPasswordLocal,
  ) {}

  async create(user: UserAttributes): Promise<UserAttributes> {
    const password = await this.hashPasswordLocal.hash(user.password);

    return await this.userLocal.create({
      ...user,
      password: password,
    });
  }

  async getByUserName(userName: string): Promise<UserAttributes> {
    return await this.userLocal.getByUserName(userName);
  }

  async getById(id: number): Promise<UserAttributes> {
    return await this.userLocal.getById(id);
  }
}
