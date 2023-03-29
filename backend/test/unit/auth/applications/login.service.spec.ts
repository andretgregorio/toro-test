import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from 'src/auth/applications/login.service';
import {
  FindAccountByEmailPort,
  FindAccountByEmailPortToken,
} from 'src/auth/applications/ports/out/find-account-by-email';
import { Account } from 'src/auth/domain/account';
import { LoginCommandFixture } from '../__fixtures__/login-command-fixture';
import { AccountFixture } from '../__fixtures__/account-fixture';
import { BusinessError } from 'src/auth/domain/business-error';
import { PasswordHashService } from 'src/auth/applications/services/password-hash.service';
import { JwtService } from 'src/auth/applications/services/jwt.service';

describe('LoginService', () => {
  let service: LoginService;
  let hashService: PasswordHashService;
  let jwtService: JwtService;

  const mockFindAccountPort = {
    findAccountByEmail: jest.fn(),
  } as unknown as FindAccountByEmailPort;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        PasswordHashService,
        JwtService,
        { provide: FindAccountByEmailPortToken, useValue: mockFindAccountPort },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
    hashService = module.get<PasswordHashService>(PasswordHashService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('when the login attempt is successful', () => {
    const command = new LoginCommandFixture().build();
    const account = new AccountFixture()
      .withEmail(command.email)
      .withPassword('hashedPassword')
      .build();
    const jwtToken = 'jwtToken';

    beforeEach(() => {
      jest
        .spyOn(mockFindAccountPort, 'findAccountByEmail')
        .mockResolvedValue(account);

      jest.spyOn(hashService, 'verifyPassword').mockResolvedValue(true);

      jest.spyOn(jwtService, 'createToken').mockReturnValue(jwtToken);
    });

    it('should return the account information', async () => {
      const [result, _] = (await service.login(command)) as [Account, string];

      expect(result).toBeInstanceOf(Account);
    });

    it('should call the hashService.verifyPassword with correct parameters', async () => {
      await service.login(command);

      expect(hashService.verifyPassword).toHaveBeenNthCalledWith(
        1,
        command.password,
        account.password,
      );
    });

    it('should call the jwtService.createToken with correct parameters', async () => {
      await service.login(command);

      expect(jwtService.createToken).toHaveBeenNthCalledWith(
        1,
        account.id,
        account.email,
      );
    });

    it('should return the JWT token', async () => {
      const [_, accessToken] = (await service.login(command)) as [
        Account,
        string,
      ];

      expect(accessToken).toEqual(jwtToken);
    });
  });

  describe('when the provided email is not found in the database', () => {
    const command = new LoginCommandFixture().build();

    beforeEach(() => {
      jest
        .spyOn(mockFindAccountPort, 'findAccountByEmail')
        .mockResolvedValue(null);
    });

    it('should return a Business Error', async () => {
      const failedLogin = await service.login(command);

      expect(failedLogin).toBeInstanceOf(BusinessError);
    });
  });

  describe('when the provided password is incorrect', () => {
    const command = new LoginCommandFixture().build();
    const account = new AccountFixture()
      .withEmail(command.email)
      .withPassword('hashedPassword')
      .build();

    beforeEach(() => {
      jest
        .spyOn(mockFindAccountPort, 'findAccountByEmail')
        .mockResolvedValue(account);

      jest.spyOn(hashService, 'verifyPassword').mockResolvedValue(false);
    });

    it('should return a Business Error', async () => {
      const failedLogin = await service.login(command);

      expect(failedLogin).toBeInstanceOf(BusinessError);
    });
  });
});
