import { injectable, ApplicationError } from '../shared';
import {
  UserRepository,
  PasswordRepository,
  TokenRepository,
} from '../repositories';
import { ApplicationErrors } from '../shared';

type Input = {
  userName: string;
  password: string;
};

type Output = {
  token: string;
};

@injectable()
export class SignInUserService {
  constructor(
    private userRepository: UserRepository,
    private passwordRepository: PasswordRepository,
    private tokenRepository: TokenRepository,
  ) {}

  async signIn(user: Input): Promise<Output> {
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

    const token = await this.tokenRepository.sign({
      id: userFound.id,
      name: userFound.name,
      lastName: userFound.lastName,
    });

    return { token };
  }
}
