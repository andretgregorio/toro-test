import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from 'src/auth/applications/services/jwt.service';

@Injectable()
export class InspectJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const [tokenType, token] = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('No token provided');

    if (this.notBearerToken(tokenType))
      throw new UnauthorizedException('Invalid token');

    const decodedToken = this.jwtService.verifyToken(token);

    if (!decodedToken) throw new UnauthorizedException('Invalid token');

    request.headers['X_TORO_ACCOUNT_ID'] = decodedToken['accountId'];
    request.headers['X_TORO_ACCOUNT_EMAIL'] = decodedToken['email'];

    return true;
  }

  private extractTokenFromHeader(request): [string, string] {
    return request.headers.authorization?.split(' ') || [];
  }

  private notBearerToken(tokenType: string) {
    return tokenType !== 'Bearer';
  }
}
