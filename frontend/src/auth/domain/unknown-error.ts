import { BusinessError } from './business-error';

export class UnknownError extends BusinessError {
  constructor() {
    super('An unknown error occurred. Please try again.');
  }
}
