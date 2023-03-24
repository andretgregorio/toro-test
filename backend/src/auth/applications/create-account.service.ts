import { Injectable } from '@nestjs/common';
import { CreateAccountCommand } from './ports/in/create-account-command';

@Injectable()
export class CreateAccountService {
  async createAccount(command: CreateAccountCommand): Promise<boolean> {
    if (command.password.length < 8) return false;

    return true;
  }
}
