import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAccountService {
  async createAccount(): Promise<boolean> {
    return true;
  }
}
