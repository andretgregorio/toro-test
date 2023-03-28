import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindAccountService } from 'src/auth/adapters/persistance/find-account.service';
import { AccountTable } from 'src/auth/adapters/persistance/tables/account-table';
import { Account } from 'src/auth/domain/account';
import { AccountFixture } from '../../__fixtures__/account-fixture';

describe('FindAccountService', () => {
  let service: FindAccountService;
  const mockAccountRepository = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAccountService,
        {
          provide: getRepositoryToken(AccountTable),
          useValue: mockAccountRepository,
        },
      ],
    }).compile();

    service = module.get<FindAccountService>(FindAccountService);
  });

  describe('#findAccountByEmail', () => {
    describe('when an account  is found with the given  email', () => {
      it('should return the account', async () => {
        const existingAccount = new AccountFixture().build();

        jest
          .spyOn(mockAccountRepository, 'findOneBy')
          .mockResolvedValue(existingAccount);

        const account = await service.findAccountByEmail(existingAccount.email);

        expect(account).toBeInstanceOf(Account);
      });
    });

    describe('when an account is not  found in the database', () => {
      it('returns null', async () => {
        const email = 'non-existing@email.com';

        jest.spyOn(mockAccountRepository, 'findOneBy').mockResolvedValue(null);

        const account = await service.findAccountByEmail(email);

        expect(account).toBeNull();
      });
    });
  });
});
