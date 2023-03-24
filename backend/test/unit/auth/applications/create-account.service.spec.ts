import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountService } from 'src/auth/applications/create-account.service';
import { CreateAccountCommandFixture } from '../__fixtures__/create-account-command-fixture';
import { CreateAccountCommandValidatorService } from 'src/auth/applications/services/create-account-command-validator.service';

describe('CreateAccountService', () => {
  let service: CreateAccountService;
  let validationService: CreateAccountCommandValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateAccountService, CreateAccountCommandValidatorService],
    }).compile();

    service = module.get<CreateAccountService>(CreateAccountService);
    validationService = module.get<CreateAccountCommandValidatorService>(
      CreateAccountCommandValidatorService,
    );
  });

  describe('#createAccount', () => {
    describe('when there is no validation error', () => {
      beforeEach(() => {
        jest.spyOn(validationService, 'validate').mockReturnValue(true);
      });

      it('should create an account', async () => {
        const command = new CreateAccountCommandFixture()
          .withPassword('Test1234!')
          .build();

        const result = await service.createAccount(command);
        expect(result).toBe(true);
      });
    });
  });
});
