import { injectable } from '../../shared';
import { UserModel, UserAttributes, PreferredCurrencyModel } from '../models';

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

  async getById(id: number): Promise<UserAttributes> {
    return await UserModel.findOne({
      where: { id },
      include: [
        {
          model: PreferredCurrencyModel,
          as: 'preferredCurrency',
          required: true,
        },
      ],
      raw: true,
      nest: true,
    });
  }
}
