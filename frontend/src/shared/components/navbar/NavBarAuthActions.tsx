import { useContext } from 'react';
import { PermIdentity } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import AuthContext from '@/auth/state/AuthContext';

export function NavBarAuthActions() {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return (
      <Button variant="text" color="primary">
        Logout
      </Button>
    );
  }

  return (
    <Box display="flex" alignItems="center">
      <Button variant="text" color="primary" startIcon={<PermIdentity />}>
        Login
      </Button>
      <Button variant="outlined" color="primary">
        Create your account
      </Button>
    </Box>
  );
}