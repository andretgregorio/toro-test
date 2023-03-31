import { PermIdentity } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/auth/views/useAuth';

export function NavBarAuthActions() {
  const isLoggedIn = useAuth();

  if (isLoggedIn) {
    return (
      <Button variant="text" color="primary">
        Logout
      </Button>
    );
  }

  return (
    <Box display="flex" alignItems="center">
      <Link href="login">
        <Button variant="text" color="primary" startIcon={<PermIdentity />}>
          Login
        </Button>
      </Link>
      <Button variant="outlined" color="primary">
        Create your account
      </Button>
    </Box>
  );
}
