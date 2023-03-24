import { Injectable } from '@nestjs/common';
import { ValidationError } from 'src/auth/domain/validation-error';
import { CreateAccountCommand } from '../ports/in/create-account-command';

@Injectable()
export class CreateAccountCommandValidatorService {
  validate(command: CreateAccountCommand): ValidationError | true {
    if (command.password.length < 8)
      return new ValidationError('Password should have at least 8 characters.');

    if (!/\d/.test(command.password))
      return new ValidationError(
        'Password should contain at least one number.',
      );

    return true;
  }
}
