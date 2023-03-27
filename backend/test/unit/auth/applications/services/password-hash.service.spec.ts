import * as bcrypt from 'bcrypt';
import { Test, TestingModule } from '@nestjs/testing';
import { PasswordHashService } from 'src/auth/applications/services/password-hash.service';

describe('PasswordHashService', () => {
  let service: PasswordHashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordHashService],
    }).compile();

    service = module.get<PasswordHashService>(PasswordHashService);
  });

  it('should return the result of bcrypt hash', async () => {
    const password = 'Test1234!';
    const hashedPassword = 'hashedPassword' as never;

    jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);

    const result = await service.generateHash(password);

    expect(result).toBe(hashedPassword);
  });
});
