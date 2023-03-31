import { AccessToken } from '@/auth/domain/access-token';
import { StoredAccount } from '@/auth/domain/account';
import { LoginError } from '@/auth/domain/login-error';
import * as accessTokenStorage from '@/auth/infra/browser-storage/acces-token';
import * as request from '@/auth/infra/http/login-request';
import { loginService } from '@/auth/services/login-service';

describe('LoginService', () => {
  describe('when login  is  successful', () => {
    const email = 'test@gmail.com';
    const accessToken = 'access-token';

    const loginRequestResponse = [{ id: 1, email }, accessToken] as Tuple<
      StoredAccount,
      AccessToken
    >;

    beforeEach(() => {
      vi.spyOn(request, 'loginRequest').mockResolvedValue(loginRequestResponse);
      vi.spyOn(accessTokenStorage, 'saveAccessToken').mockImplementation(
        () => undefined
      );
    });

    it('should return the account', async () => {
      const result = await loginService(email, 'password');

      expect(result).toEqual(loginRequestResponse[0]);
    });

    it('should save the access token', async () => {
      await loginService(email, 'password');

      expect(accessTokenStorage.saveAccessToken).toHaveBeenNthCalledWith(
        1,
        accessToken
      );
    });
  });

  describe('when login is not successful', () => {
    const email = 'test@gmail.com';

    const loginRequestResponse = new LoginError();

    beforeEach(() => {
      vi.spyOn(request, 'loginRequest').mockResolvedValue(loginRequestResponse);
      vi.spyOn(accessTokenStorage, 'saveAccessToken').mockImplementation(
        () => undefined
      );
    });

    it('should return the error', async () => {
      const result = await loginService(email, 'password');

      expect(result).toBeInstanceOf(LoginError);
    });

    it('should not save the acces token', () => {
      const result = loginService(email, 'password');

      expect(accessTokenStorage.saveAccessToken).not.toHaveBeenCalled();
    });
  });
});
