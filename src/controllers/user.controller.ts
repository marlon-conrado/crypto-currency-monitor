import {
  container,
  Post,
  ApplicationError,
  ApplicationErrors,
} from '../shared';
import { SignInUserService, SignUpUserService } from '../services';
import { CreateUserDto, LoginDto } from '../dto';

const signInUserService = container.resolve(SignInUserService);
const signUpUserService = container.resolve(SignUpUserService);

export class UserController {
  @Post('/user/login')
  async login(req: any) {
    const result = LoginDto.validate(req.body);

    if (result.error) {
      throw new ApplicationError(ApplicationErrors.ValidationError);
    }

    return await signInUserService.login(req.body);
  }

  @Post('/user/register')
  async createUser(req: any) {
    const result = CreateUserDto.validate(req.body);

    if (result.error) {
      throw new ApplicationError(ApplicationErrors.ValidationError);
    }

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
