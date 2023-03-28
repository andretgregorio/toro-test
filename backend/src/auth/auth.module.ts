import { Module } from '@nestjs/common';
import { CreateAccountService } from './applications/create-account.service';
import { CreateAccountCommandValidatorService } from './applications/services/create-account-command-validator.service';
import { PasswordHashService } from './applications/services/password-hash.service';
import { CreateAccountController } from './adapters/http/create-account.controller';
import { SaveAccountRepository } from './adapters/persistance/save-account.service';
import { SaveAccountPortToken } from './applications/ports/out/save-account-port';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [
    CreateAccountService,
    CreateAccountCommandValidatorService,
    PasswordHashService,
    { provide: SaveAccountPortToken, useClass: SaveAccountRepository },
  ],
  controllers: [CreateAccountController],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'auth',
      entities: [],
      synchronize: true,
    }),
  ],
})
export class AuthModule {}
