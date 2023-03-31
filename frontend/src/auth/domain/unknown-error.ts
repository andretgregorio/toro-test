import { BusinessError } from './business-error';

export class UnknownError implements BusinessError {
  readonly message: string;

  constructor() {
    this.message = 'An unknown error occurred. Please try again.';
  }
}
