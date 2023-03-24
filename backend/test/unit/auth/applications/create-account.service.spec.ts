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
      const command = new CreateAccountCommandFixture().build();

      const result = await service.createAccount(command);
      expect(result).toBe(true);
    });

    describe('when password is smaller the 8 characters', () => {
      it('should return false', async () => {
        const command = new CreateAccountCommandFixture()
          .withPassword('1234567')
          .build();

        const result = await service.createAccount(command);

        expect(result).toBe(false);
      });
    });
  });
});
