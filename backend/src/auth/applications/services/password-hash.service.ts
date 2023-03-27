import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordHashService {
  async generateHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
