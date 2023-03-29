import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from 'src/auth/applications/login.service';
import {
  FindAccountByEmailPort,
  FindAccountByEmailPortToken,
} from 'src/auth/applications/ports/out/find-account-by-email';
import { Account } from 'src/auth/domain/account';

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
    it('should return the account information', async () => {
      const email = 'test@gmail.com';
      const password = '1234Qwer';

      const result = await service.login(email, password);

      expect(result).toBeInstanceOf(Account);
    });
  });
});
