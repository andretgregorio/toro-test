import { removeAccessToken } from '@/auth/infra/browser-storage/acces-token';
import { AuthenticationError } from '../domain/authentication-error';
import { getAccountBalance } from '../infra/account-balance-request';

export async function getWallet() {
  const accountBalance = await getAccountBalance();

  if (accountBalance instanceof AuthenticationError) {
    removeAccessToken();
  }

  return accountBalance;
}
