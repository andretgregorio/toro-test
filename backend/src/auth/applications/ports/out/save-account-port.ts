import { Account } from 'src/auth/domain/account';

export interface SaveAccountPort {
  saveAccount(email: string, password: string): Promise<Account>;
}
