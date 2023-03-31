import { BusinessError } from '@/auth/domain/business-error';
import { request } from '@/shared/http/request';
import { RequestError } from '@/shared/http/request-error';
import { BusinessErrorOr } from '@/auth/domain/business-error';
import { StoredAccount } from '@/auth/domain/account';
import { AccessToken } from '@/auth/domain/access-token';

interface CreateAccountResponse {
  account: {
    id: number;
    email: string;
  };
  accessToken: string;
}

export async function createAccountRequest(
  email: string,
  password: string
): Promise<BusinessErrorOr<Tuple<StoredAccount, AccessToken>>> {
  const path = 'auth/v1/accounts';
  const payload = { email, password };

  const response = await request.post<typeof payload, CreateAccountResponse>(
    path,
    {
      email,
      password,
    }
  );

  if (response instanceof RequestError) {
    return new BusinessError(response.message);
  }

  return [response.account, response.accessToken];
}
