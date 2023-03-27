import { Test, TestingModule } from '@nestjs/testing';
import { SaveAccountService } from 'src/auth/adapters/persistance/save-account.service';

describe('SaveAccountService', () => {
  let service: SaveAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaveAccountService],
    }).compile();

    service = module.get<SaveAccountService>(SaveAccountService);
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
