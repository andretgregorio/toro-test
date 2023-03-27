import { Module } from '@nestjs/common';
import { CreateAccountService } from './applications/create-account.service';
import { CreateAccountCommandValidatorService } from './applications/services/create-account-command-validator.service';
import { PasswordHashService } from './applications/services/password-hash.service';
import { CreateAccountController } from './adapters/http/create-account.controller';
import { SaveAccountRepository } from './adapters/persistance/save-account.service';

@Module({
  providers: [
    CreateAccountService,
    CreateAccountCommandValidatorService,
    PasswordHashService,
    SaveAccountRepository,
  ],
  controllers: [CreateAccountController],
})
export class AuthModule {}
