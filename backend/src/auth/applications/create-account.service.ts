import { Injectable } from '@nestjs/common';
import { CreateAccountCommand } from './ports/in/create-account-command';
import { ValidationError } from '../domain/validation-error';
import { BusinessError } from '../domain/business-error';

@Injectable()
export class CreateAccountService {
  async createAccount(
    command: CreateAccountCommand,
  ): Promise<BusinessError | boolean> {
    if (command.password.length < 8)
      return new ValidationError('Password should have at least 8 characters.');

    if (!/\d/.test(command.password))
      return new ValidationError(
        'Password should contain at least one number.',
      );

    return true;
  }
}
