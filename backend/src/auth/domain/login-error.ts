import { BusinessError } from './business-error';

export class LoginError extends BusinessError {
  constructor(message: string) {
    super({ code: 400, message });
  }
}
