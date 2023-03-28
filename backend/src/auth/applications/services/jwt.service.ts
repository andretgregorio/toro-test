import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  createToken(accountId: number, email: string): string {
    const token = jwt.sign({ accountId, email }, 'my_super_secret');
    return token;
  }
}
