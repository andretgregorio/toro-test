import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveAccountPort } from 'src/auth/applications/ports/out/save-account-port';
import { Account } from 'src/auth/domain/account';
import { AccountTable } from './tables/account-table';
import { Repository } from 'typeorm';

@Injectable()
export class SaveAccountRepository implements SaveAccountPort {
  constructor(
    @InjectRepository(AccountTable)
    private accountRepository: Repository<AccountTable>,
  ) {}

  async saveAccount(email: string, password: string): Promise<Account> {
    const createdAccount = await this.accountRepository.save({
      email,
      password,
    });

    return new Account({
      id: createdAccount.id,
      email: createdAccount.email,
      password: createdAccount.password,
      createdAt: createdAccount.created_at,
      updatedAt: createdAccount.updated_at,
    });
  }
}
