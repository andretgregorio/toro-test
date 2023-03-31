import { BusinessError } from './business-error';

export class AuthenticationError extends BusinessError {
  constructor() {
    super('Please, login with your credentials or create an account.');
  }
}
