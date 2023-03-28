import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SaveAccountRepository } from 'src/auth/adapters/persistance/save-account.service';
import { AccountTable } from 'src/auth/adapters/persistance/tables/account-table';
import { AccountFixture } from '../../__fixtures__/account-fixture';

describe('SaveAccountService', () => {
  let service: SaveAccountRepository;
  const mockAccountRepository = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaveAccountRepository,
        {
          provide: getRepositoryToken(AccountTable),
          useValue: mockAccountRepository,
        },
      ],
    }).compile();

    service = module.get<SaveAccountRepository>(SaveAccountRepository);
  });

  describe('#saveAccount', () => {
    it('returns an Account', async () => {
      const email = 'email@gmail.com';
      const password = 'password';

      const createdAccount = new AccountFixture()
        .withEmail(email)
        .withPassword(password)
        .build();

      jest
        .spyOn(mockAccountRepository, 'save')
        .mockResolvedValue(createdAccount);

      const result = await service.saveAccount(email, password);

      expect(result.id).toBe(createdAccount.id);
    });
  });
});
