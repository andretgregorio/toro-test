import { Test, TestingModule } from '@nestjs/testing';
import { AccountBalanceController } from 'src/auth/adapters/http/account-balance.controller';
import { JwtService } from 'src/auth/applications/services/jwt.service';

describe('AccountBalanceController', () => {
  let controller: AccountBalanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountBalanceController],
      providers: [JwtService],
    }).compile();

    controller = module.get<AccountBalanceController>(AccountBalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
