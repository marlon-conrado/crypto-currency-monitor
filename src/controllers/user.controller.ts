import {
  container,
  Post,
  ApplicationError,
  ApplicationErrors,
} from '../shared';
import { SignInUserService, SignUpUserService } from '../services';
import {
  SignUpDto,
  SignUpBodySchema,
  SignInDto,
  SignInBodySchema,
} from '../dto';

const signInUserService = container.resolve(SignInUserService);
const signUpUserService = container.resolve(SignUpUserService);

export class UserController {
  @Post('/user/sign_in')
  async signIn(req: { body: SignInDto }) {
    const result = SignInBodySchema.validate(req.body);

    if (result.error) {
      throw new ApplicationError(ApplicationErrors.ValidationError);
    }

    return await signInUserService.signIn(req.body);
  }

  @Post('/user/sign_up')
  async createUser(req: { body: SignUpDto }) {
    const result = SignUpBodySchema.validate(req.body);

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
    delete data.id;
    return data;
  }
}
