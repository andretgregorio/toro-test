import { Inject, Injectable } from '@nestjs/common';
import {
  FindAccountByEmailPort,
  FindAccountByEmailPortToken,
} from './ports/out/find-account-by-email';
import { LoginCommand } from './ports/in/login-command';

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

    return account;
  }
}
