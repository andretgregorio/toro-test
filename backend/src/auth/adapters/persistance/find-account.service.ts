import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAccountByEmailPort } from 'src/auth/applications/ports/out/find-account-by-email';
import { Account } from 'src/auth/domain/account';
import { AccountTable } from './tables/account-table';
import { Repository } from 'typeorm';

@Injectable()
export class FindAccountService implements FindAccountByEmailPort {
  constructor(
    @InjectRepository(AccountTable)
    private accountRepository: Repository<AccountTable>,
  ) {}

  async findAccountByEmail(email: string): Promise<Account | null> {
    const account = await this.accountRepository.findOneBy({ email });

    if (!account) return null;

    return new Account({
      id: account.id,
      email: account.email,
      password: account.password,
      createdAt: account.created_at,
      updatedAt: account.updated_at,
    });
  }
}
