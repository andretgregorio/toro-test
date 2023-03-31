import { loginRequest } from '@/auth/adapters/http/login-request';
import { AccessToken } from '@/auth/domain/access-token';
import { StoredAccount } from '@/auth/domain/account';
import { LoginError } from '@/auth/domain/login-error';
import { UnknownError } from '@/auth/domain/unknown-error';
import { request } from '@/shared/http/request';
import { RequestError } from '@/shared/http/request-error';

describe('loginRequest', () => {
  const loginPath = 'auth/v1/login';

  it('should call request.post with the correct path and payload', async () => {
    vi.spyOn(request, 'post').mockResolvedValueOnce({});

    const email = 'test@email.com';
    const password = 'password';

    await loginRequest(email, password);

    expect(request.post).toHaveBeenNthCalledWith(1, loginPath, {
      email,
      password,
    });
  });

  describe('when the request is successful and has a 2xx status code', () => {
    it('should return an Account and an  AccessToken', async () => {
      const response = {
        account: { id: 1, email: 'test@gmail.com' },
        accessToken: 'token',
      };

      vi.spyOn(request, 'post').mockResolvedValueOnce(response);

      const [account, accessToken] = (await loginRequest(
        'foo',
        'bar'
      )) as Tuple<StoredAccount, AccessToken>;

      expect(account).toStrictEqual(response.account);
      expect(accessToken).toStrictEqual(response.accessToken);
    });
  });

  describe('when the request fails due to a status >= 4xx', () => {
    it('returns a LoginError', async () => {
      const error = new RequestError('invalid_data', 400, {});

      vi.spyOn(request, 'post').mockResolvedValueOnce(error);

      const result = await loginRequest('foo', 'bar');

      expect(result).toBeInstanceOf(LoginError);
    });
  });

  describe('when the request fails due to a status different from 4xx', () => {
    it('returns an UnknownError', async () => {
      const error = new RequestError('invalid_data', 500, {});

      vi.spyOn(request, 'post').mockResolvedValueOnce(error);

      const result = await loginRequest('foo', 'bar');

      expect(result).toBeInstanceOf(UnknownError);
    });
  });
});
