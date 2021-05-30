import 'reflect-metadata';
import { bootServer } from './boot-loaders';

async function main() {
  bootServer();

  import('./controllers');
}

main();
