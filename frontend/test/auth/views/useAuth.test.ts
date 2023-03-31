import * as getAccessTokenStorage from '@/auth/infra/browser-storage/acces-token';
import { useAuth } from '@/auth/views/useAuth';

describe('useAuth', () => {
  it('should return true if there is an access token', () => {
    vi.spyOn(getAccessTokenStorage, 'getAccessToken').mockReturnValue(
      'access-token'
    );

    const isLoggedIn = useAuth();

    expect(isLoggedIn).toBe(true);
  });

  it('should return false if there is no access token', () => {
    vi.spyOn(getAccessTokenStorage, 'getAccessToken').mockReturnValue(null);

    const isLoggedIn = useAuth();

    expect(isLoggedIn).toBe(false);
  });
});
