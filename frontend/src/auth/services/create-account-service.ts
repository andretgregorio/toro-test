import { BusinessError } from '../domain/business-error';
import { saveAccessToken } from '../infra/browser-storage/acces-token';
import { createAccountRequest } from '../infra/http/create-account-request';

export async function createAccountService(email: string, password: string) {
  const responseOrError = await createAccountRequest(email, password);

  if (responseOrError instanceof BusinessError) {
    return responseOrError;
  }

  const [account, accessToken] = responseOrError;

  console.log(accessToken);

  saveAccessToken(accessToken);

  return account;
}
