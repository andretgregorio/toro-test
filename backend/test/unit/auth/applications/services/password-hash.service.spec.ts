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

  describe('#verifyPassword', () => {
    it('should call the bcrypt compare function with the correct parameters', async () => {
      jest.spyOn(bcrypt, 'compare');

      const [rawPassword, hashPassword] = ['rawPassword', 'hashedPassword'];

      await service.verifyPassword(rawPassword, hashPassword);

      expect(bcrypt.compare).toHaveBeenNthCalledWith(
        1,
        rawPassword,
        hashPassword,
      );
    });

    it.each([{ result: true }, { result: false }])(
      'should return $result when bcrypt.compare returns $result',
      async ({ result }) => {
        // @ts-expect-error: The bcrypt library has two overloads for the compare function.
        // One of them returns a Promise<boolean>, but the other is void. Typescript is
        // throwing a type error because it doesn't know which overload is being used.
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(result);

        const [rawPassword, hashPassword] = ['rawPassword', 'hashedPassword'];

        const compareResult = await service.verifyPassword(
          rawPassword,
          hashPassword,
        );

        expect(compareResult).toBe(result);
      },
    );
  });
});
