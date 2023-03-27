import { Module } from '@nestjs/common';
import { CreateAccountService } from './applications/create-account.service';
import { CreateAccountCommandValidatorService } from './applications/services/create-account-command-validator.service';
import { PasswordHashService } from './applications/services/password-hash.service';

@Module({
  providers: [CreateAccountService, CreateAccountCommandValidatorService, PasswordHashService]
})
export class AuthModule {}
