import { useContext } from 'react';
import { PermIdentity } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import Link from 'next/link';

export function NavBarAuthActions() {
  if (false) {
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
