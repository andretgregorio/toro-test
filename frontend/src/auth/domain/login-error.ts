import { BusinessError } from './business-error';

export class LoginError extends BusinessError {
  constructor() {
    super('Invalid email or password');
  }
}
