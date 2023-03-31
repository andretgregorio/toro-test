import { Box, Container, Typography } from '@mui/material';
import Layout from '@/shared/layout';
import Head from 'next/head';
import LoginBox from '@/auth/views/login/LoginBox';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Toro | Fullstack Test</title>
      </Head>
      <Layout>
        <Container>
          <Box width="100%">
            <Box maxWidth={422} width="100%" mx="auto" mt={20}>
              <LoginBox>
                <Typography variant="h5">Acesse sua conta Toro</Typography>
              </LoginBox>
            </Box>
          </Box>
        </Container>
      </Layout>
    </>
  );
}
