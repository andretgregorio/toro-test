import { Module } from '@nestjs/common';
import { CreateAccountService } from './applications/create-account.service';

@Module({
  providers: [CreateAccountService]
})
export class AuthModule {}
