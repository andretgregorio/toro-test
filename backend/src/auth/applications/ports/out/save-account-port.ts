import { Account } from 'src/auth/domain/account';

export const SaveAccountPortToken = Symbol('SaveAccountPortToken');

export interface SaveAccountPort {
  saveAccount(email: string, password: string): Promise<Account>;
}
