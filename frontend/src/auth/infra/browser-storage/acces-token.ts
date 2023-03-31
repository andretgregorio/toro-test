export function saveAccessToken(accessToken: string): void {
  sessionStorage.setItem('accessToken', accessToken);
}
