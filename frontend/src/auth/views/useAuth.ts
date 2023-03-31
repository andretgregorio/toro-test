import { useEffect, useState } from 'react';
import { getAccessToken } from '../infra/browser-storage/acces-token';

export function useAuth(): boolean {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const hasAccessToken = getAccessToken();
    setIsLoggedIn(!!hasAccessToken);
  });

  return isLoggedIn;
}
