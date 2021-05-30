import { ApplicationErrors } from '../errors/application.errors';

export class ApplicationError extends Error {
  constructor(name: ApplicationErrors) {
    super(name);
    this.name = name;
  }
}
