import { Account } from 'src/auth/domain/account';

export class AccountJsonResponse {
  id: number;
  email: string;

  constructor(account: Account) {
    this.id = account.id;
    this.email = account.email;
  }
}
