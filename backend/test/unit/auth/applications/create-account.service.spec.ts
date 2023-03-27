import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountService } from 'src/auth/applications/create-account.service';
import { CreateAccountCommandFixture } from '../__fixtures__/create-account-command-fixture';
import { CreateAccountCommandValidatorService } from 'src/auth/applications/services/create-account-command-validator.service';
import { ValidationError } from 'src/auth/domain/validation-error';
import { BusinessError } from 'src/auth/domain/business-error';
import { PasswordHashService } from 'src/auth/applications/services/password-hash.service';

describe('CreateAccountService', () => {
  let service: CreateAccountService;
  let validationService: CreateAccountCommandValidatorService;
  let hashService: PasswordHashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAccountService,
        CreateAccountCommandValidatorService,
        PasswordHashService,
      ],
    }).compile();

    service = module.get<CreateAccountService>(CreateAccountService);
    validationService = module.get<CreateAccountCommandValidatorService>(
      CreateAccountCommandValidatorService,
    );
    hashService = module.get<PasswordHashService>(PasswordHashService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#createAccount', () => {
    describe('when there is no validation error', () => {
      beforeEach(() => {
        jest.spyOn(validationService, 'validate').mockReturnValue(true);

        jest
          .spyOn(hashService, 'generateHash')
          .mockResolvedValue('hashedPassword');
      });

      it('should create an account', async () => {
        const command = new CreateAccountCommandFixture()
          .withPassword('Test1234!')
          .build();

        const result = await service.createAccount(command);

        expect(result).toBe(true);
      });
    });

    describe('when there is a validation error', () => {
      beforeEach(() => {
        jest
          .spyOn(validationService, 'validate')
          .mockReturnValue(
            new ValidationError('Password should have at least 8 characters.'),
          );

        jest
          .spyOn(hashService, 'generateHash')
          .mockResolvedValue('hashedPassword');
      });

      it('should return a BusinessError', async () => {
        const command = new CreateAccountCommandFixture().build();

        const result = await service.createAccount(command);

        expect(result).toBeInstanceOf(BusinessError);
      });
    });
  });
});
