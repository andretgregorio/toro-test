import { Account } from 'src/auth/domain/account';

export const FindAccountByEmailPortToken = Symbol(
  'FindAccountByEmailPortToken',
);

export interface FindAccountByEmailPort {
  findAccountByEmail(email: string): Promise<Account | null>;
}
