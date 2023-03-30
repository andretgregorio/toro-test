import { render, screen } from '@testing-library/react';
import NavBar from '@/shared/NavBar';

describe('NavBar', () => {
  describe('when the user is not autenticated', () => {
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
});
