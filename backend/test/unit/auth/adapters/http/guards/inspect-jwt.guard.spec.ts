import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { InspectJwtGuard } from 'src/auth/adapters/http/guards/inspect-jwt.guard';
import { JwtService } from 'src/auth/applications/services/jwt.service';

function createMockExecutionContext(headers: Record<string, string>) {
  return createMock<ExecutionContext>({
    switchToHttp: () => ({
      getRequest: () => ({
        headers,
      }),
    }),
  });
}

describe('InspectJwtGuard', () => {
  const jwtService = createMock<JwtService>({
    verifyToken: jest.fn(),
  });

  describe('when there is a correct token in the request header', () => {
    it('should return true', () => {
      jest
        .spyOn(jwtService, 'verifyToken')
        .mockReturnValue({ accountId: 1, email: 'test@email.com' });

      const guard = new InspectJwtGuard(jwtService);

      const mockExecutionContext = createMockExecutionContext({
        authorization: 'Bearer 123',
      });

      const guardResult = guard.canActivate(mockExecutionContext);

      expect(guardResult).toBe(true);
    });
  });

  describe('should throw a UnauthorizedException', () => {
    it('when the request has no token', () => {
      const guard = new InspectJwtGuard(jwtService);

      const mockExecutionContext = createMockExecutionContext({});

      expect(() => guard.canActivate(mockExecutionContext)).toThrow(
        UnauthorizedException,
      );
    });

    it('when the token is not a Bearer token', () => {
      const guard = new InspectJwtGuard(jwtService);

      const mockExecutionContext = createMockExecutionContext({
        authorization: '123',
      });

      expect(() => guard.canActivate(mockExecutionContext)).toThrow(
        UnauthorizedException,
      );
    });

    it('when we are not able to decode the token', () => {
      jest.spyOn(jwtService, 'verifyToken').mockReturnValue(null);

      const guard = new InspectJwtGuard(jwtService);

      const mockExecutionContext = createMockExecutionContext({
        authorization: '123',
      });

      expect(() => guard.canActivate(mockExecutionContext)).toThrow(
        UnauthorizedException,
      );
    });
  });
});
