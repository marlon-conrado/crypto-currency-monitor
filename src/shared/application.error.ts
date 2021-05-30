import { ApplicationErrors } from './errors';

export class ApplicationError extends Error {
  constructor(name: ApplicationErrors) {
    super(name);
    this.name = name;
  }
}
