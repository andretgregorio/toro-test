import { Test, TestingModule } from '@nestjs/testing';
import { SaveAccountRepository } from 'src/auth/adapters/persistance/save-account.service';

describe('SaveAccountService', () => {
  let service: SaveAccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaveAccountRepository],
    }).compile();

    service = module.get<SaveAccountRepository>(SaveAccountRepository);
  });

  describe('#saveAccount', () => {
    it('returns an Account', async () => {
      const email = 'email@gmail.com';
      const password = 'password';
      const result = await service.saveAccount(email, password);

      expect(result.id).toBe(1);
    });
  });
});
