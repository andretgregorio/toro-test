import { Inject, Injectable } from '@nestjs/common';
import {
  FindAccountByEmailPort,
  FindAccountByEmailPortToken,
} from './ports/out/find-account-by-email';
import { LoginCommand } from './ports/in/login-command';
import { LoginError } from '../domain/login-error';
import { PasswordHashService } from './services/password-hash.service';
import { JwtService } from './services/jwt.service';
import { BusinessError } from '../domain/business-error';
import { Account } from '../domain/account';

@Injectable()
export class LoginService {
  constructor(
    private hashService: PasswordHashService,

    private jwtService: JwtService,

    @Inject(FindAccountByEmailPortToken)
    private findAccountPort: FindAccountByEmailPort,
  ) {}

  async login(
    command: LoginCommand,
  ): Promise<BusinessError | Tuple<Account, string>> {
    const account = await this.findAccountPort.findAccountByEmail(
      command.email,
    );

    if (!account)
      return new LoginError(
        'Invalid credentials. Verify the the email and password and try again.',
      );

    const isValidPassword = await this.hashService.verifyPassword(
      command.password,
      account.password,
    );

    if (!isValidPassword)
      return new LoginError(
        'Invalid credentials. Verify the the email and password and try again.',
      );

    const accessToken = this.jwtService.createToken(account.id, account.email);

    return [account, accessToken];
  }
}
