import { AppBar, Box, Container, Typography } from '@mui/material';
import { NavBarAuthActions } from './NavBarAuthActions';

export default function NavBar() {
  return (
    <AppBar color="transparent">
      <Container>
        <Box display="flex" justifyContent="space-between">
          <Typography fontSize={28} color="primary" fontWeight="bold">
            TORO
          </Typography>

          <NavBarAuthActions />
        </Box>
      </Container>
    </AppBar>
  );
}
