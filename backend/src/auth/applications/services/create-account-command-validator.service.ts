import { Injectable } from '@nestjs/common';
import { ValidationError } from 'src/auth/domain/validation-error';
import { CreateAccountCommand } from '../ports/in/create-account-command';
import { passwordConfig } from 'src/auth/domain/password-config';

@Injectable()
export class CreateAccountCommandValidatorService {
  validate(command: CreateAccountCommand): ValidationError | true {
    if (command.password.length < passwordConfig.minLength)
      return new ValidationError('Password should have at least 8 characters.');

    if (!passwordConfig.allowedCharactersRegex.test(command.password))
      return new ValidationError(
        'Password should contain at least one number, one lower case letter and one upper case letter.',
      );

    return true;
  }
}
