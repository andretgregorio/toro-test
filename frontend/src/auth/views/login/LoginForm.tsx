import { Box, Button, TextField } from '@mui/material';
import { useLoginForm } from './useLoginForm';
import { loginRequest } from '@/auth/infra/http/login-request';
import { BusinessError } from '@/auth/domain/business-error';
import LoginErrorMessage from './LoginErrorMessage';
import { loginService } from '@/auth/services/login-service';
import { useRouter } from 'next/router';

export default function LoginForm() {
  const form = useLoginForm();
  const router = useRouter();

  const attemptLogin = async () => {
    const response = await loginService(form.email, form.password);

    if (response instanceof BusinessError) {
      form.setErrorMessage(response.message);
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
            Entrar
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
