import * as getAccessTokenStorage from '@/auth/infra/browser-storage/acces-token';
import { useAuth } from '@/auth/views/useAuth';
import { renderHook } from '@testing-library/react';

describe('useAuth', () => {
  it('should return true if there is an access token', () => {
    vi.spyOn(getAccessTokenStorage, 'getAccessToken').mockReturnValue(
      'access-token'
    );

    const { result } = renderHook(() => useAuth());

    expect(result.current).toBe(true);
  });

  it('should return false if there is no access token', () => {
    vi.spyOn(getAccessTokenStorage, 'getAccessToken').mockReturnValue(null);

    const { result } = renderHook(() => useAuth());

    expect(result.current).toBe(false);
  });
});
