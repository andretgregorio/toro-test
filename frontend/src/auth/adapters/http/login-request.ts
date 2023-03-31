import { LoginError } from '@/auth/domain/login-error';
import { UnknownError } from '@/auth/domain/unknown-error';
import { request } from '@/shared/http/request';
import { RequestError } from '@/shared/http/request-error';

// This function acts as an adapter  between the HTTP request abd the rest of the application.
// It is a clear boundary between the infrastructure layer and the domain layer.
export async function loginRequest(email: string, password: string) {
  const path = '/auth/v1/login';
  const payload = { email, password };

  const response = await request.post(path, payload);

  if (response instanceof RequestError) {
    if (response.httpStatusCode >= 400 && response.httpStatusCode < 500) {
      return new LoginError();
    } else {
      return new UnknownError();
    }
  }

  return response;
}
