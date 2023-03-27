import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountController } from 'src/auth/adapters/http/create-account.controller';

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
        const result = await controller.createAccount();

        expect(result).toEqual({ message: 'Hello World' });
      });
    });
  });
});
