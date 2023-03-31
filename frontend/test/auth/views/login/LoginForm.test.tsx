import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '@/auth/views/login/LoginForm';

describe('LoginForm', () => {
  describe('when user types in email input', () => {
    const email = 'test@email.com';
    const password = 'secretPassword1234';

    it('changes the email input value when user types', async () => {
      render(<LoginForm />);

      const emailInput = screen.getByRole('textbox', { name: /email/i });

      await userEvent.type(emailInput, email);

      await waitFor(() => {
        expect(emailInput).toHaveValue(email);
      });
    });

    it('changes the password input value when user types', async () => {
      render(<LoginForm />);

      const passwordInput = screen.getByLabelText(/password/i);

      await userEvent.type(passwordInput, password);

      await waitFor(() => {
        expect(passwordInput).toHaveValue(password);
      });
    });
  });
});
