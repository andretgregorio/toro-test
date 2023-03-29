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

describe('LoginService', () => {
  let service: LoginService;

  const mockFindAccountPort = {
    findAccountByEmail: jest.fn(),
  } as unknown as FindAccountByEmailPort;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        { provide: FindAccountByEmailPortToken, useValue: mockFindAccountPort },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  describe('when the login attempt is successful', () => {
    const command = new LoginCommandFixture().build();
    const account = new AccountFixture()
      .withEmail(command.email)
      .withPassword(command.password)
      .build();

    beforeEach(() => {
      jest
        .spyOn(mockFindAccountPort, 'findAccountByEmail')
        .mockResolvedValue(account);
    });

    it('should return the account information', async () => {
      const result = await service.login(command);

      expect(result).toBeInstanceOf(Account);
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
});
