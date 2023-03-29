import { Module } from '@nestjs/common';
import { CreateAccountService } from './applications/create-account.service';
import { CreateAccountCommandValidatorService } from './applications/services/create-account-command-validator.service';
import { PasswordHashService } from './applications/services/password-hash.service';
import { CreateAccountController } from './adapters/http/create-account.controller';
import { SaveAccountRepository } from './adapters/persistance/save-account.service';
import { SaveAccountPortToken } from './applications/ports/out/save-account-port';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountTable } from './adapters/persistance/tables/account-table';
import { FindAccountService } from './adapters/persistance/find-account.service';
import { FindAccountByEmailPortToken } from './applications/ports/out/find-account-by-email';
import { JwtService } from './applications/services/jwt.service';
import { LoginService } from './applications/login.service';
import { LoginController } from './adapters/http/login.controller';

@Module({
  providers: [
    CreateAccountService,
    CreateAccountCommandValidatorService,
    PasswordHashService,
    { provide: SaveAccountPortToken, useClass: SaveAccountRepository },
    { provide: FindAccountByEmailPortToken, useClass: FindAccountService },
    JwtService,
    LoginService,
  ],
  controllers: [CreateAccountController, LoginController],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'auth',
      entities: [AccountTable],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([AccountTable]),
  ],
})
export class AuthModule {}
