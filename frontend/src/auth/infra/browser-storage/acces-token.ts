const ACCESS_TOKEN_KEY = 'accessToken';

export function saveAccessToken(accessToken: string): void {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }
}

export function getAccessToken(): string | null {
  if (typeof window !== 'undefined') {
    return window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }

  return null;
}
