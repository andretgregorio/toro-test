import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountService } from 'src/auth/applications/create-account.service';
import { CreateAccountCommandFixture } from '../__fixtures__/create-account-command-fixture';
import { CreateAccountCommandValidatorService } from 'src/auth/applications/services/create-account-command-validator.service';
import { ValidationError } from 'src/auth/domain/validation-error';
import { BusinessError } from 'src/auth/domain/business-error';
import { PasswordHashService } from 'src/auth/applications/services/password-hash.service';
import { Account } from 'src/auth/domain/account';
import {
  SaveAccountPort,
  SaveAccountPortToken,
} from 'src/auth/applications/ports/out/save-account-port';
import {
  FindAccountByEmailPort,
  FindAccountByEmailPortToken,
} from 'src/auth/applications/ports/out/find-account-by-email';
import { AccountFixture } from '../__fixtures__/account-fixture';
import { JwtService } from 'src/auth/applications/services/jwt.service';

describe('CreateAccountService', () => {
  let service: CreateAccountService;
  let validationService: CreateAccountCommandValidatorService;
  let hashService: PasswordHashService;
  let jwtService: JwtService;

  const mockSaveAccountPort = {
    saveAccount: jest.fn(),
  } as unknown as SaveAccountPort;
  const mockFindAccountPort = {
    findAccountByEmail: jest.fn(),
  } as unknown as FindAccountByEmailPort;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAccountService,
        CreateAccountCommandValidatorService,
        PasswordHashService,
        JwtService,
        { provide: SaveAccountPortToken, useValue: mockSaveAccountPort },
        { provide: FindAccountByEmailPortToken, useValue: mockFindAccountPort },
      ],
    }).compile();

    service = module.get<CreateAccountService>(CreateAccountService);
    validationService = module.get<CreateAccountCommandValidatorService>(
      CreateAccountCommandValidatorService,
    );
    hashService = module.get<PasswordHashService>(PasswordHashService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#createAccount', () => {
    describe('when there is no validation error', () => {
      const mockHashedPassword = 'hashedPassword';
      const jwtoken = 'jwtoken';

      const command = new CreateAccountCommandFixture()
        .withPassword('Test1234!')
        .build();

      const createdAccount = new Account({
        id: 1,
        email: command.email,
        password: mockHashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      beforeEach(() => {
        jest.spyOn(validationService, 'validate').mockReturnValue(true);

        jest
          .spyOn(hashService, 'generateHash')
          .mockResolvedValue(mockHashedPassword);

        jest
          .spyOn(mockSaveAccountPort, 'saveAccount')
          .mockResolvedValue(createdAccount);

        jest.spyOn(jwtService, 'createToken').mockReturnValue(jwtoken);
      });

      it('should return the created account', async () => {
        const [account] = (await service.createAccount(command)) as Tuple<
          Account,
          string
        >;

        expect(account).toStrictEqual(createdAccount);
      });

      it('should returned the created access token', async () => {
        const [_, accessToken] = (await service.createAccount(
          command,
        )) as Tuple<Account, string>;

        expect(accessToken).toBe(jwtoken);
      });
    });

    describe('when there is a password validation error', () => {
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

    describe('when there already is an account with the same email', () => {
      it('should return a BusinessError', async () => {
        const command = new CreateAccountCommandFixture().build();
        const foundAccount = new AccountFixture()
          .withEmail(command.email)
          .withPassword(command.password)
          .build();

        jest.spyOn(validationService, 'validate').mockReturnValue(true);
        jest
          .spyOn(mockFindAccountPort, 'findAccountByEmail')
          .mockResolvedValue(foundAccount);

        const result = await service.createAccount(command);

        expect(result).toBeInstanceOf(BusinessError);
      });
    });
  });
});
