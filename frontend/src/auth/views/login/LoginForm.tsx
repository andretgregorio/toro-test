import { Box, Button, TextField } from '@mui/material';
import { useLoginForm } from './useLoginForm';

export default function LoginForm() {
  const form = useLoginForm();

  return (
    <Box
      component="form"
      width="100%"
      display="flex"
      flexDirection="column"
      mt={4}
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
        <Button type="submit" variant="contained" fullWidth>
          Entrar
        </Button>
      </Box>
    </Box>
  );
}
