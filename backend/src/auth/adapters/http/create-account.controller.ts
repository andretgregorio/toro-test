import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAccountCommand } from 'src/auth/applications/ports/in/create-account-command';

@Controller('auth/v1/accounts')
export class CreateAccountController {
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createAccount(@Body() createAccountCommand: CreateAccountCommand) {
    return { message: 'Hello World' };
  }
}
