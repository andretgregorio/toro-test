import { render, screen } from '@testing-library/react';
import NavBar from '@/shared/components/navbar/NavBar';
import * as authHook from '@/auth/views/useAuth';

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const renderNavBar = () => render(<NavBar />);

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
      vi.spyOn(authHook, 'useAuth').mockReturnValue(true);

      renderNavBar();

      const logoutButton = screen.getByRole('button', { name: /logout/i });

      expect(logoutButton).toBeVisible();
    });
  });
});
