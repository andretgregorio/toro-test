import { Injectable } from '@nestjs/common';
import { CreateAccountCommand } from './ports/in/create-account-command';
import { BusinessError } from '../domain/business-error';
import { CreateAccountCommandValidatorService } from './services/create-account-command-validator.service';

@Injectable()
export class CreateAccountService {
  constructor(
    private validationService: CreateAccountCommandValidatorService,
  ) {}

  async createAccount(
    command: CreateAccountCommand,
  ): Promise<BusinessError | boolean> {
    const validationResult = this.validationService.validate(command);

    if (validationResult instanceof BusinessError) return validationResult;

    return true;
  }
}
