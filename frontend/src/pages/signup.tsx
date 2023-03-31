import SignUpBox from '@/auth/views/signup/SignUpBox';
import SignUpForm from '@/auth/views/signup/SignUpForm';
import Layout from '@/shared/layout';
import { Box, Container, Typography } from '@mui/material';
import Head from 'next/head';

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Toro | Fullstack Test</title>
      </Head>
      <Layout>
        <Container>
          <Box width="100%">
            <Box maxWidth={422} width="100%" mx="auto" mt={20}>
              <SignUpBox>
                <Typography variant="h5">Create your Toro account</Typography>
                <SignUpForm />
              </SignUpBox>
            </Box>
          </Box>
        </Container>
      </Layout>
    </>
  );
}
