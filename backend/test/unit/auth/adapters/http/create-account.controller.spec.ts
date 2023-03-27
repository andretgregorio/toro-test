import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountController } from 'src/auth/adapters/http/create-account.controller';
import { CreateAccountCommandFixture } from '../../__fixtures__/create-account-command-fixture';
import { CreateAccountService } from 'src/auth/applications/create-account.service';

describe('CreateAccountController', () => {
  let controller: CreateAccountController;
  const service = {
    createAccount: jest.fn(),
  } as unknown as CreateAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateAccountController],
      providers: [{ provide: CreateAccountService, useValue: service }],
    }).compile();

    controller = module.get<CreateAccountController>(CreateAccountController);
  });

  describe('#createAccount', () => {
    describe('when account is correctly created', () => {
      it('returns a JSON with the correct representation of an account', async () => {
        const requestPayload = new CreateAccountCommandFixture().build();

        const result = await controller.createAccount(requestPayload);

        expect(result).toEqual({ message: 'Hello World' });
      });
    });
  });
});
