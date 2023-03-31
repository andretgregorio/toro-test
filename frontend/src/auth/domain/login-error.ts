import { BusinessError } from './business-error';

export class LoginError implements BusinessError {
  readonly message: string;

  constructor() {
    this.message = 'Invalid email or password';
  }
}
