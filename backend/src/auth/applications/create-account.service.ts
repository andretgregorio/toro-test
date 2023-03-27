import { Injectable } from '@nestjs/common';
import { CreateAccountCommand } from './ports/in/create-account-command';
import { BusinessError } from '../domain/business-error';
import { CreateAccountCommandValidatorService } from './services/create-account-command-validator.service';
import { PasswordHashService } from './services/password-hash.service';

@Injectable()
export class CreateAccountService {
  constructor(
    private validationService: CreateAccountCommandValidatorService,

    private hashService: PasswordHashService,
  ) {}

  async createAccount(
    command: CreateAccountCommand,
  ): Promise<BusinessError | boolean> {
    const validationResult = this.validationService.validate(command);

    if (validationResult instanceof BusinessError) return validationResult;

    const hashedPassword = await this.hashService.generateHash(
      command.password,
    );

    return true;
  }
}
