import { Account } from 'src/auth/domain/account';
import { CreateAccountCommand } from '../in/create-account-command';

export interface SaveAccountPort {
  saveAccount(command: CreateAccountCommand): Promise<Account>;
}
