import { Alert, Snackbar } from '@mui/material';

interface LoginErrorProps {
  error: string;
  isOpened: boolean;
  onClose: () => void;
}

export default function LoginErrorMessage({
  error,
  isOpened,
  onClose,
}: LoginErrorProps) {
  return (
    <Snackbar open={isOpened} autoHideDuration={3000} onClose={onClose}>
      <Alert severity="error">{error}</Alert>
    </Snackbar>
  );
}
