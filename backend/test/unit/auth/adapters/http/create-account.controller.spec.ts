import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountController } from 'src/auth/adapters/http/create-account.controller';
import { CreateAccountCommandFixture } from '../../__fixtures__/create-account-command-fixture';
import { CreateAccountService } from 'src/auth/applications/create-account.service';
import { Account } from 'src/auth/domain/account';
import { ValidationError } from 'class-validator';
import { BusinessError } from 'src/auth/domain/business-error';
import { BadRequestException } from '@nestjs/common';

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
        const createdAccount = new Account({
          id: 1,
          email: requestPayload.email,
          password: requestPayload.password,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        jest.spyOn(service, 'createAccount').mockResolvedValue(createdAccount);

        const result = await controller.createAccount(requestPayload);

        expect(result.account.id).toBe(createdAccount.id);
        expect(result.account.email).toBe(createdAccount.email);
      });
    });

    describe('when the account cannot be created', () => {
      it('throws a BadRequestException', async () => {
        const requestPayload = new CreateAccountCommandFixture().build();

        jest
          .spyOn(service, 'createAccount')
          .mockResolvedValue(
            new BusinessError({ code: 400, message: 'Some error' }),
          );

        try {
          await controller.createAccount(requestPayload);
          expect(true).toBe(false);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
        }
      });
    });
  });
});
