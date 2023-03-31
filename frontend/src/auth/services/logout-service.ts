import { removeAccessToken } from '../infra/browser-storage/acces-token';

export function logoutService() {
  removeAccessToken();
}
