import { Inject, Injectable } from '@nestjs/common';
import {
  FindAccountByEmailPort,
  FindAccountByEmailPortToken,
} from './ports/out/find-account-by-email';
import { LoginCommand } from './ports/in/login-command';
import { LoginError } from '../domain/login-error';

@Injectable()
export class LoginService {
  constructor(
    @Inject(FindAccountByEmailPortToken)
    private findAccountPort: FindAccountByEmailPort,
  ) {}

  async login(command: LoginCommand) {
    const account = await this.findAccountPort.findAccountByEmail(
      command.email,
    );

    if (!account)
      return new LoginError(
        'Invalid credentials. Verify the the email and password and try again.',
      );

    return account;
  }
}
