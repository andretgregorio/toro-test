import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

// Ideally this would be set in an environment variable and it would be a huge hash.
// Since I'm  not deploying this code and given the time constraints
// I preferred to hardcode it.
const JWT_SECRET = 'my_super_secret';

@Injectable()
export class JwtService {
  createToken(accountId: number, email: string): string {
    const token = jwt.sign({ accountId, email }, JWT_SECRET);

    return token;
  }

  verifyToken(token: string): string | object {
    const verificationResult = jwt.verify(token, JWT_SECRET);

    return verificationResult;
  }
}
