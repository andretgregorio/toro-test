import { Box, Paper } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function LoginBox({ children }: PropsWithChildren) {
  return (
    <Paper elevation={2} sx={{ px: 2, py: 6 }}>
      <Box width="100%">{children}</Box>
    </Paper>
  );
}
