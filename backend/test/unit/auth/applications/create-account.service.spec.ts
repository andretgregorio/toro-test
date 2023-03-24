import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountService } from 'src/auth/applications/create-account.service';

describe('CreateAccountService', () => {
  let service: CreateAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateAccountService],
    }).compile();

    service = module.get<CreateAccountService>(CreateAccountService);
  });

  describe('#createAccount', () => {
    it('should create an account', async () => {
      const result = await service.createAccount();
      expect(result).toBe(true);
    });
  });
});
