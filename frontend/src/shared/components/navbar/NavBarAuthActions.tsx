import { PermIdentity } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/auth/views/useAuth';
import { logoutService } from '@/auth/services/logout-service';
import { useRouter } from 'next/router';

export function NavBarAuthActions() {
  const isLoggedIn = useAuth();
  const router = useRouter();

  function logOut() {
    logoutService();

    router.push('/');
  }

  if (isLoggedIn) {
    return (
      <Button variant="text" color="primary" onClick={logOut}>
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
      <Link href="signup">
        <Button variant="outlined" color="primary">
          Create your account
        </Button>
      </Link>
    </Box>
  );
}
