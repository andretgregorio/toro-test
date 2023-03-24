import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountCommandValidatorService } from 'src/auth/applications/services/create-account-command-validator.service';
import { CreateAccountCommandFixture } from '../../__fixtures__/create-account-command-fixture';

describe('CreateAccountCommandValidatorService', () => {
  let service: CreateAccountCommandValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateAccountCommandValidatorService],
    }).compile();

    service = module.get<CreateAccountCommandValidatorService>(
      CreateAccountCommandValidatorService,
    );
  });

  describe('should return a Validation Error', () => {
    it('when password is smaller than 8 characters', () => {
      const command = new CreateAccountCommandFixture()
        .withPassword('1234567')
        .build();

      const result = service.createAccount(command);

      expect(result).toBeInstanceOf(BusinessError);
    });

    it('when password does not contain numbers', () => {
      const command = new CreateAccountCommandFixture()
        .withPassword('abcdefgh')
        .build();

      const result = service.createAccount(command);

      expect(result).toBeInstanceOf(BusinessError);
    });
  });
});
