import { injectable } from '../shared';
import axios, { Method } from 'axios';

type Data = {
  query?: any;
  body?: any;
};

@injectable()
export class ApiRemote {
  async get(url: string, data?: Data) {
    return await this.request('get', url, data);
  }

  private async request(method: Method, url: string, data: Data) {
    return await axios[method](this.replaceValuesInUrl(url, data), data.body);
  }

  private replaceValuesInUrl(url: string, data: Data): string {
    let urlWithValues = url;

    Object.keys(data.query).forEach((key) => {
      const regexp = `{q.${key}}`;

      urlWithValues = urlWithValues.replace(
        new RegExp(regexp, 'g'),
        data.query[key],
      );
    });

    return urlWithValues;
  }
}
