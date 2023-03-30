import { Controller, Get, UseGuards } from '@nestjs/common';
import { InspectJwtGuard } from './guards/inspect-jwt.guard';

@Controller('auth/v1/account-balance')
export class AccountBalanceController {
  @Get()
  @UseGuards(InspectJwtGuard)
  getAccountBalance() {
    const fixedTitles = Math.floor(Math.random() * 1000);
    const stockExchangeShares = Math.floor(Math.random() * 1000);

    return {
      account_balance: {
        fixed_titles: fixedTitles,
        stock_exchange_shares: stockExchangeShares,
        total: fixedTitles + stockExchangeShares,
      },
    };
  }
}
