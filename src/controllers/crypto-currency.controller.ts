import { app } from '../common';

app.get('/crypto_currency', getCryptoCurrencies);
export async function getCryptoCurrencies(req: any, res: any) {
  return res.json('Hello!');
}
