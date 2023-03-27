import { Injectable } from '@nestjs/common';
import { SaveAccountPort } from 'src/auth/applications/ports/out/save-account-port';
import { Account } from 'src/auth/domain/account';

@Injectable()
export class SaveAccountService implements SaveAccountPort {
  async saveAccount(email: string, password: string): Promise<Account> {
    return new Account({
      id: 1,
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
