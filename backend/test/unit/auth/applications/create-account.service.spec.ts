import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountService } from 'src/auth/applications/create-account.service';
import { CreateAccountCommandFixture } from '../__fixtures__/create-account-command-fixture';

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
      const command = new CreateAccountCommandFixture()
        .withPassword('Test1234!')
        .build();

      const result = await service.createAccount(command);
      expect(result).toBe(true);
    });
  });
});
