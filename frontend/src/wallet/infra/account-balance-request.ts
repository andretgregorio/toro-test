import { getAccessToken } from '@/auth/infra/browser-storage/acces-token';
import { request } from '@/shared/http/request';
import { RequestError } from '@/shared/http/request-error';
import { AuthenticationError } from '../domain/authentication-error';
import { BusinessErrorOr } from '../domain/business-error';
import { AccountBalance } from '../domain/account-balance';

interface AccountBalanceResponse {
  account_balance: {
    fixed_titles: number;
    stock_exchange_shares: number;
    total: number;
  };
}

export async function getAccountBalance(): Promise<
  BusinessErrorOr<AccountBalance>
> {
  const accessToken = getAccessToken();

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await request.get<AccountBalanceResponse>(
    'auth/v1/account-balance',
    { headers }
  );

  if (response instanceof RequestError) return new AuthenticationError();

  return {
    fixedTitles: response.account_balance.fixed_titles,
    stockExchangeShare: response.account_balance.stock_exchange_shares,
    total: response.account_balance.total,
  };
}
