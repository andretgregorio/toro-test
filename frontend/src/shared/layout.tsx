import { PropsWithChildren } from 'react';
import NavBar from './components/navbar/NavBar';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
