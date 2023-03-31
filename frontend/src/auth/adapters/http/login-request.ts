import { AccessToken } from '@/auth/domain/access-token';
import { StoredAccount } from '@/auth/domain/account';
import { BusinessErrorOr } from '@/auth/domain/business-error';
import { LoginError } from '@/auth/domain/login-error';
import { UnknownError } from '@/auth/domain/unknown-error';
import { request } from '@/shared/http/request';
import { RequestError } from '@/shared/http/request-error';

interface ResponsePayload {
  account: {
    id: number;
    email: string;
  };
  accessToken: string;
}

// This function acts as an adapter  between the HTTP request abd the rest of the application.
// It is a clear boundary between the infrastructure layer and the domain layer.
export async function loginRequest(
  email: string,
  password: string
): Promise<BusinessErrorOr<Tuple<StoredAccount, AccessToken>>> {
  const path = '/auth/v1/login';
  const payload = { email, password };

  const response = await request.post<typeof payload, ResponsePayload>(
    path,
    payload
  );

  if (response instanceof RequestError) {
    if (response.httpStatusCode >= 400 && response.httpStatusCode < 500) {
      return new LoginError();
    } else {
      return new UnknownError();
    }
  }

  return [response.account, response.accessToken];
}
