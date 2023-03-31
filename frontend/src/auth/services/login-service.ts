import { StoredAccount } from '../domain/account';
import { BusinessError, BusinessErrorOr } from '../domain/business-error';
import { loginRequest } from '../infra/http/login-request';

export async function loginService(
  email: string,
  password: string
): Promise<BusinessErrorOr<StoredAccount>> {
  const responseOrError = await loginRequest(email, password);

  if (responseOrError instanceof BusinessError) {
    return responseOrError;
  }

  const [account, accessToken] = responseOrError;

  return account;
}
