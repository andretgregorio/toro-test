import { PropsWithChildren } from 'react';
import NavBar from './components/navbar/NavBar';
import { Box } from '@mui/material';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main>
      <NavBar />
      <Box height={42} />
      {children}
    </main>
  );
}
