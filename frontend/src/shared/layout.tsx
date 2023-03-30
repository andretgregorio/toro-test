import { AppBar } from '@mui/material';
import { PropsWithChildren } from 'react';

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <AppBar position="static" color="transparent">
        <h1>Toro Secure</h1>
      </AppBar>
      {children}
    </>
  );
}
