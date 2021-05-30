import { injectable } from '../../common';
import { UserModel, UserAttributes } from '../models';

@injectable()
export class UserLocal {
  async create(user: UserAttributes) {
    return await new UserModel(user).save();
  }

  async getByUserName(userName: string): Promise<UserAttributes> {
    return await UserModel.findOne({
      where: { userName },
      raw: true,
    });
  }
}
