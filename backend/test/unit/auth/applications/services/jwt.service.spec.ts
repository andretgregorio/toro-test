import { Test, TestingModule } from '@nestjs/testing';
import * as jwt from 'jsonwebtoken';
import { JwtService } from 'src/auth/applications/services/jwt.service';

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtService],
    }).compile();

    service = module.get<JwtService>(JwtService);
  });

  describe('#createToken', () => {
    const accountId = 1;
    const email = 'test@gmail.com';
    const createdToken = '1234abcd';

    beforeEach(() => {
      // @ts-expect-error: The JWT library has three overloads for the sign function.
      // One of them returns a string, but the other two are void. Typescript is
      // throwing a type error because it doesn't know which overload is being used.
      jest.spyOn(jwt, 'sign').mockReturnValue(createdToken);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return the token created by the jsonwebtoken library', async () => {
      const token = service.createToken(accountId, email);

      expect(token).toEqual(createdToken);
    });

    it('should call the jsonwebtoken library with the correct parameters', async () => {
      service.createToken(accountId, email);

      expect(jwt.sign).toHaveBeenNthCalledWith(
        1,
        { accountId, email },
        'my_super_secret',
      );
    });
  });
});
