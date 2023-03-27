import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAccountService } from 'src/auth/applications/create-account.service';
import { CreateAccountCommand } from 'src/auth/applications/ports/in/create-account-command';

@Controller('auth/v1/accounts')
export class CreateAccountController {
  constructor(private service: CreateAccountService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createAccount(@Body() createAccountCommand: CreateAccountCommand) {
    const account = await this.service.createAccount(createAccountCommand);

    return { message: 'Hello World' };
  }
}
