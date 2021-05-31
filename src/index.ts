import 'reflect-metadata';
import { app, express } from './app';
import { environment } from './shared';
import httpContext from 'express-http-context';

async function main() {
  app.use(express.json({ limit: '50mb' }));
  app.use(httpContext.middleware);

  import('./controllers');

  app.listen(environment.port, () => {
    console.log(`Listen on port ${environment.port}`);
  });
}

main();
