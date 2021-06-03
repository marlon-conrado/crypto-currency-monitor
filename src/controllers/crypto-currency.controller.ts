import {
  Get,
  authMiddleware,
  container,
  Post,
  ApplicationError,
  ApplicationErrors,
} from '../shared';
import {
  CryptoCurrencyService,
  AddCryptoCurrencyService,
  GetTopCryptoCurrenciesService,
} from '../services';
import httpContext from 'express-http-context';
import {
  AddCryptoCurrencyDto,
  AddCryptoCurrencyBodySchema,
  GetTopCryptoCurrencyQuerySchema,
} from '../dto';
import { GetTopCryptoCurrencyDto } from '../dto';

const cryptoCurrencyService = container.resolve(CryptoCurrencyService);
const addCryptoCurrencyService = container.resolve(AddCryptoCurrencyService);
const getTopCryptoCurrenciesService = container.resolve(
  GetTopCryptoCurrenciesService,
);

export class CryptoCurrencyController {
  @Get('/crypto_currencies', [authMiddleware])
  async getAll() {
    const user = httpContext.get('user');

    return await cryptoCurrencyService.getAll({ userId: user.id });
  }

  @Post('/crypto_currency', [authMiddleware])
  async add(req: { body: AddCryptoCurrencyDto }) {
    if (AddCryptoCurrencyBodySchema.validate(req.body).error) {
      throw new ApplicationError(ApplicationErrors.ValidationError);
    }

    const user = httpContext.get('user');
    const result = await addCryptoCurrencyService.add({
      userId: user.id,
      coinId: req.body.coinId,
    });

    delete result.id;

    return result;
  }

  @Get('/crypto_currencies/top', [authMiddleware])
  async getTop(req: { query: GetTopCryptoCurrencyDto }) {
    if (GetTopCryptoCurrencyQuerySchema.validate(req.query).error) {
      throw new ApplicationError(ApplicationErrors.ValidationError);
    }

    const user = httpContext.get('user');

    return await getTopCryptoCurrenciesService.getTop({
      userId: user.id,
      amountRows: req.query.limit ?? 25,
      orderDirection: req.query.order ?? 'desc',
    });
  }
}
