import { injectable, ApplicationError } from '../common';
import { UserRepository, PasswordRepository } from '../repositories';
import { ApplicationErrors } from '../errors';
import { UserAttributes } from '../local';

type Input = {
  userName: string;
  password: string;
};

@injectable()
export class SignInUserService {
  constructor(
    private userRepository: UserRepository,
    private passwordRepository: PasswordRepository,
  ) {}

  async login(user: Input): Promise<UserAttributes> {
    const userFound = await this.userRepository.getByUserName(user.userName);

    if (!userFound) {
      throw new ApplicationError(ApplicationErrors.LoginDoesNotMatch);
    }

    const matchPassword = await this.passwordRepository.compare(
      user.password,
      userFound.password,
    );

    if (!matchPassword) {
      throw new ApplicationError(ApplicationErrors.LoginDoesNotMatch);
    }

    return userFound;
  }
}
