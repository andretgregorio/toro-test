import { getAccessToken } from '../infra/browser-storage/acces-token';

export function useAuth(): boolean {
  const hasAccessToken = getAccessToken();

  return !!hasAccessToken;
}
