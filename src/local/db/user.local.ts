import { injectable } from '../../common';
import { UserModel, UserAttributes } from '../models';

@injectable()
export class UserLocal {
  async create(user: UserAttributes) {
    const userFound = await new UserModel(user).save();
    return userFound.get();
  }

  async getByUserName(userName: string): Promise<UserAttributes> {
    return await UserModel.findOne({
      where: { userName },
      raw: true,
    });
  }
}
