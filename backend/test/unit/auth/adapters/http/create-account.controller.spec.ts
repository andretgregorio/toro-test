import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountController } from 'src/auth/adapters/http/create-account.controller';
import { CreateAccountCommandFixture } from '../../__fixtures__/create-account-command-fixture';

describe('CreateAccountController', () => {
  let controller: CreateAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateAccountController],
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
