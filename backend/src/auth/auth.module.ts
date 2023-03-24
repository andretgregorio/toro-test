import { Module } from '@nestjs/common';
import { CreateAccountService } from './applications/create-account.service';
import { CreateAccountCommandValidatorService } from './applications/services/create-account-command-validator.service';

@Module({
  providers: [CreateAccountService, CreateAccountCommandValidatorService]
})
export class AuthModule {}
