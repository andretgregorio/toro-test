import Head from 'next/head';
import Layout from '@/shared/layout';
import { Box, Typography, Container } from '@mui/material';

export default function Home() {
  return (
    <>
      <Head>
        <title>Toro | Fullstack Test</title>
      </Head>
      <main>
        <Layout>
          <Container>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              mt={10}
            >
              <Typography variant="h1" align="center">
                Welcome to Toro!
              </Typography>
              <Typography>Please login to access your account.</Typography>
            </Box>
          </Container>
        </Layout>
      </main>
    </>
  );
}
