import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAccountService } from 'src/auth/applications/create-account.service';
import { CreateAccountCommand } from 'src/auth/applications/ports/in/create-account-command';
import { AccountJsonResponse } from './json/account-response';
import { BusinessError } from 'src/auth/domain/business-error';

@Controller('auth/v1/accounts')
export class CreateAccountController {
  constructor(private service: CreateAccountService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createAccount(@Body() createAccountCommand: CreateAccountCommand) {
    const serviceResult = await this.service.createAccount(
      createAccountCommand,
    );

    if (serviceResult instanceof BusinessError)
      throw new BadRequestException({ error: serviceResult.message });

    const [account, accessToken] = serviceResult;

    const response = new AccountJsonResponse(account);

    return { account: response };
  }
}
