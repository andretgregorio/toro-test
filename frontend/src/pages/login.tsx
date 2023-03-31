import { Container, Typography } from '@mui/material';
import Layout from '@/shared/layout';
import Head from 'next/head';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Toro | Fullstack Test</title>
      </Head>
      <Layout>
        <Container>
          <Typography>Login page!</Typography>
        </Container>
      </Layout>
    </>
  );
}
