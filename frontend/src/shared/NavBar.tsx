import { AppBar, Box, Button, Container, Typography } from '@mui/material';
import { PermIdentity } from '@mui/icons-material';

export default function NavBar() {
  return (
    <AppBar color="transparent">
      <Container>
        <Box display="flex" justifyContent="space-between">
          <Typography fontSize={28} color="primary" fontWeight="bold">
            TORO
          </Typography>

          <Box display="flex" alignItems="center">
            <Button variant="text" color="primary" startIcon={<PermIdentity />}>
              Login
            </Button>
            <Button variant="outlined" color="primary">
              Create your account
            </Button>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}
