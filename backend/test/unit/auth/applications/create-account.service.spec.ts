import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountService } from 'src/auth/applications/create-account.service';
import { CreateAccountCommandFixture } from '../__fixtures__/create-account-command-fixture';
import { BusinessError } from 'src/auth/domain/business-error';

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

    describe('when password is smaller than 8 characters', () => {
      it('should return a Business Error', async () => {
        const command = new CreateAccountCommandFixture()
          .withPassword('1234567')
          .build();

        const result = await service.createAccount(command);

        expect(result).toBeInstanceOf(BusinessError);
      });
    });

    describe('when password does not contain numbers', () => {
      it('returns a Business Error', async () => {
        const command = new CreateAccountCommandFixture()
          .withPassword('abcdefgh')
          .build();

        const result = await service.createAccount(command);

        expect(result).toBeInstanceOf(BusinessError);
      });
    });
  });
});
