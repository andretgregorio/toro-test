import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountCommandValidatorService } from 'src/auth/applications/services/create-account-command-validator.service';
import { CreateAccountCommandFixture } from '../../__fixtures__/create-account-command-fixture';
import { ValidationError } from 'src/auth/domain/validation-error';

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

  describe('should return true', () => {
    it.each([{ password: '1234Qwer' }, { password: 'qWer1234' }])(
      'when password is $password',
      ({ password }) => {
        const command = new CreateAccountCommandFixture()
          .withPassword(password)
          .build();

        const result = service.validate(command);

        expect(result).toBe(true);
      },
    );
  });

  describe('should return a Validation Error', () => {
    it.each([
      {
        password: '1a2B3c',
        description: 'when password is smaller than 8 characters',
      },
      {
        password: 'aBcDeFgH',
        description: 'when password does not contain numbers',
      },
      {
        password: '123456789',
        description: 'when password does not contain letters',
      },
      {
        password: '1234qwer',
        description: 'when password does not contain upper case letters',
      },
      {
        password: '1234QWER',
        description: 'when password does not contain lower case letters',
      },
      {
        password: '1234Qwer!@#$',
        description: 'when password contains special characters',
      },
    ])('$description', ({ password }) => {
      const command = new CreateAccountCommandFixture()
        .withPassword(password)
        .build();

      const result = service.validate(command);

      expect(result).toBeInstanceOf(ValidationError);
    });
  });
});
