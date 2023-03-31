import { Box, Button, TextField } from '@mui/material';
import { useLoginForm } from './useSignUpForm';
import { BusinessError } from '@/auth/domain/business-error';
import LoginErrorMessage from './SignUpErrorMessage';
import { loginService } from '@/auth/services/login-service';
import { useRouter } from 'next/router';
import { createAccountService } from '@/auth/services/create-account-service';

export default function SignUpForm() {
  const form = useLoginForm();
  const router = useRouter();

  const attemptLogin = async () => {
    const response = await createAccountService(form.email, form.password);

    if (response instanceof BusinessError) {
      return form.setErrorMessage(response.message);
    }

    router.push('/wallet');
  };

  return (
    <>
      <Box
        component="form"
        width="100%"
        display="flex"
        flexDirection="column"
        mt={4}
        onSubmit={(e) => e.preventDefault()}
      >
        <Box mt={2} width="100%">
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="filled"
            size="small"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={form.email}
            onChange={(event) => {
              form.setEmail(event.target.value);
            }}
          />
        </Box>

        <Box mt={2} width="100%">
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="filled"
            size="small"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={form.password}
            onChange={(event) => {
              form.setPassword(event.target.value);
            }}
          />
        </Box>

        <Box mt={6} width="100%">
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={form.isInvalid()}
            onClick={attemptLogin}
          >
            Create your account
          </Button>
        </Box>
      </Box>
      <LoginErrorMessage
        isOpened={!!form.errorMessage}
        error={form.errorMessage}
        onClose={() => form.setErrorMessage('')}
      />
    </>
  );
}
