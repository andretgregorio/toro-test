import { render, screen } from '@testing-library/react';
import NavBar from '@/shared/components/navbar/NavBar';
import { AuthProvider } from '@/auth/state/AuthContext';

const renderNavBar = (authenticationState = false) =>
  render(
    <AuthProvider initialIsLoggedIn={true}>
      <NavBar />
    </AuthProvider>
  );

describe('NavBar', () => {
  describe('when the user is not authenticated', () => {
    it('should show  the  login  button', () => {
      render(<NavBar />);

      const loginButton = screen.getByRole('button', { name: /login/i });

      expect(loginButton).toBeVisible();
    });

    it('should show the "create account" button', () => {
      render(<NavBar />);

      const createAccountButton = screen.getByRole('button', {
        name: /create your account/i,
      });

      expect(createAccountButton).toBeVisible();
    });
  });

  describe('when the user is authenticated', () => {
    it('should show the "logout" button', () => {
      renderNavBar(true);

      const logoutButton = screen.getByRole('button', { name: /logout/i });

      expect(logoutButton).toBeVisible();
    });
  });
});
