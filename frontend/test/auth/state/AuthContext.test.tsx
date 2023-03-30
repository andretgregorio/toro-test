import { useContext, useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import AuthContext, { AuthProvider } from '@/auth/state/AuthContext';

function TestComponent({ changeValue = false }: { changeValue?: boolean }) {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (changeValue) {
      authContext.setIsLoggedIn(true);
    }
  });

  if (authContext.isLoggedIn) return <div>Logged in</div>;
  else return <div>Not logged in</div>;
}

describe('AuthContext', () => {
  it('should be initialized with  no logged in user', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const notLoggedInText = screen.getByText(/not logged in/i);

    expect(notLoggedInText).toBeVisible();
  });

  it('should change the isLoggedIn value', async () => {
    render(
      <AuthProvider>
        <TestComponent changeValue={true} />
      </AuthProvider>
    );

    const loggedText = await screen.findByText(/logged in/i);

    expect(loggedText).toBeVisible();
  });
});
