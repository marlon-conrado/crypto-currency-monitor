import 'reflect-metadata';
import { bootServer } from './boot-loaders';
import { database } from './local';

async function main() {
  bootServer();

  await database.authenticate();

  import('./controllers');
}

main();
