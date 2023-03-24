import { BusinessError } from './business-error';

export class ValidationError extends BusinessError {
  constructor(message: string) {
    super({
      code: 400,
      message,
    });
  }
}
