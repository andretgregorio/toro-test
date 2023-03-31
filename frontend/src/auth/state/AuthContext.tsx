import { PropsWithChildren, createContext, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

interface AuthProviderProps {
  initialIsLoggedIn?: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({
  children,
  initialIsLoggedIn = false,
}: PropsWithChildren<AuthProviderProps>) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
