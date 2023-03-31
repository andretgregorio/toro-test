import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '@/auth/views/login/LoginForm';
import * as login from '@/auth/adapters/http/login-request';

describe('LoginForm', () => {
  const email = 'test@email.com';
  const password = 'secretPassword1234';

  describe('first render', () => {
    it('should have no email input value', () => {
      render(<LoginForm />);

      const emailInput = screen.getByRole('textbox', { name: /email/i });

      expect(emailInput).toHaveValue('');
    });

    it('should have no password input value', () => {
      render(<LoginForm />);

      const passwordInput = screen.getByLabelText(/password/i);

      expect(passwordInput).toHaveValue('');
    });

    it('should have disabled submit button', () => {
      render(<LoginForm />);

      const submitButton = screen.getByRole('button', { name: /entrar/i });

      expect(submitButton).toBeDisabled();
    });
  });

  describe('when user types on  both inputs', () => {
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

    it('enables the submit button when both inputs have values', async () => {
      render(<LoginForm />);

      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /entrar/i });

      await userEvent.type(emailInput, email);
      await userEvent.type(passwordInput, password);

      await waitFor(() => {
        expect(submitButton).toBeEnabled();
      });
    });
  });

  describe('when user clicks on submit button', () => {
    it('calls the loginRequest function', async () => {
      vi.spyOn(login, 'loginRequest').mockResolvedValue({});

      render(<LoginForm />);

      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /entrar/i });

      await userEvent.type(emailInput, email);
      await userEvent.type(passwordInput, password);

      await userEvent.click(submitButton);

      expect(login.loginRequest).toHaveBeenCalledWith(email, password);
    });
  });
});
