import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from 'src/auth/adapters/http/login.controller';
import { LoginService } from 'src/auth/applications/login.service';
import { LoginCommandFixture } from '../../__fixtures__/login-command-fixture';
import { AccountFixture } from '../../__fixtures__/account-fixture';
import { LoginError } from 'src/auth/domain/login-error';
import { ForbiddenException } from '@nestjs/common';

describe('LoginController', () => {
  let controller: LoginController;

  const mockLoginService = {
    login: jest.fn(),
  } as unknown as LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [{ provide: LoginService, useValue: mockLoginService }],
    }).compile();

    controller = module.get<LoginController>(LoginController);
  });

  describe('when login is successful', () => {
    const command = new LoginCommandFixture().build();
    const account = new AccountFixture()
      .withEmail(command.email)
      .withPassword('hashedPassword')
      .build();

    beforeEach(() => {
      jest
        .spyOn(mockLoginService, 'login')
        .mockResolvedValue([account, 'accessToken']);
    });

    it('should return a JSON with the account', async () => {
      const result = await controller.login(command);

      expect(result).toHaveProperty('account');
    });

    it('should return a JSON with the access token', async () => {
      const result = await controller.login(command);

      expect(result).toHaveProperty('accessToken');
    });
  });

  describe('when login fails', () => {
    it('should throw a Forbidden Exception', async () => {
      const command = new LoginCommandFixture().build();

      jest
        .spyOn(mockLoginService, 'login')
        .mockResolvedValue(new LoginError('Some error'));

      try {
        await controller.login(command);
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
      }
    });
  });
});
