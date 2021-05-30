import { container, Post } from '../common';
import { SignInUserService, SignUpUserService } from '../services';

const signInUserService = container.resolve(SignInUserService);
const signUpUserService = container.resolve(SignUpUserService);

type CreateUserDto = {
  body: {
    name: string;
    lastName: string;
    password: string;
    userName: string;
    preferredCurrency: number;
  };
};

type GetUserDto = {
  body: {
    userName: string;
    password: string;
  };
};

export class UserController {
  @Post('/user/login')
  async login(req: GetUserDto) {
    const data = await signInUserService.login(req.body);
    delete data.password;

    return data;
  }

  @Post('/user/register')
  async createUser(req: CreateUserDto) {
    const {
      lastName,
      name,
      userName,
      password,
      preferredCurrency: preferredCurrencyId,
    } = req.body;

    const data = await signUpUserService.signUp({
      name,
      lastName,
      userName,
      password,
      preferredCurrencyId,
    });

    delete data.password;
    return data;
  }
}
