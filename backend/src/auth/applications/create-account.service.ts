import { Inject, Injectable } from '@nestjs/common';
import { CreateAccountCommand } from './ports/in/create-account-command';
import { BusinessError } from '../domain/business-error';
import { CreateAccountCommandValidatorService } from './services/create-account-command-validator.service';
import { PasswordHashService } from './services/password-hash.service';
import { Account } from '../domain/account';
import {
  SaveAccountPort,
  SaveAccountPortToken,
} from './ports/out/save-account-port';
import {
  FindAccountByEmailPort,
  FindAccountByEmailPortToken,
} from './ports/out/find-account-by-email';
import { ValidationError } from '../domain/validation-error';

@Injectable()
export class CreateAccountService {
  constructor(
    private validationService: CreateAccountCommandValidatorService,

    private hashService: PasswordHashService,

    @Inject(SaveAccountPortToken)
    private saveAccountPort: SaveAccountPort,

    @Inject(FindAccountByEmailPortToken)
    private findAccountPort: FindAccountByEmailPort,
  ) {}

  async createAccount(
    command: CreateAccountCommand,
  ): Promise<BusinessError | Account> {
    const validationResult = this.validationService.validate(command);

    if (validationResult instanceof BusinessError) return validationResult;

    const foundAccount = await this.findAccountPort.findAccountByEmail(
      command.email,
    );

    if (foundAccount) return new ValidationError('Email already in use');

    const hashedPassword = await this.hashService.generateHash(
      command.password,
    );

    const account = await this.saveAccountPort.saveAccount(
      command.email,
      hashedPassword,
    );

    return account;
  }
}
