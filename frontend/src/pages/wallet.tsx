import Layout from '@/shared/layout';
import { AccountBalance } from '@/wallet/domain/account-balance';
import { BusinessError } from '@/wallet/domain/business-error';
import { getWallet } from '@/wallet/service/get-wallet';
import { Card, CardContent, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function WalletPage() {
  const [wallet, setWallet] = useState<AccountBalance>({});
  const router = useRouter();

  async function fetchAndSetWallet() {
    const wallet = await getWallet();

    if (wallet instanceof BusinessError) {
      return router.push('/');
    }

    setWallet(wallet);
  }

  useEffect(() => {
    fetchAndSetWallet();
  }, []);

  return (
    <Layout>
      <Container>
        <Typography variant="h2" mt={10} align="center">
          My Investments
        </Typography>

        <Card>
          <CardContent>
            <Typography align="center">Government Titles</Typography>
            <Typography align="center">U$ {wallet.fixedTitles}</Typography>

            <Typography align="center" mt={4}>
              Stock Market Options
            </Typography>
            <Typography align="center">
              U$ {wallet.stockExchangeShare}
            </Typography>

            <Typography align="center" mt={4}>
              Total Invested
            </Typography>
            <Typography align="center">U$ {wallet.total}</Typography>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
}
