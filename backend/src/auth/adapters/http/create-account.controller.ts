import { Controller, Post } from '@nestjs/common';

@Controller('auth/v1/accounts')
export class CreateAccountController {
  @Post()
  async createAccount() {
    return { message: 'Hello World' };
  }
}
