export function saveAccessToken(accessToken: string): void {
  sessionStorage.setItem('accessToken', accessToken);
}

export function getAccessToken(): string | null {
  return sessionStorage.getItem('accessToken');
}
