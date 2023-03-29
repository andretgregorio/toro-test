import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginService } from 'src/auth/applications/login.service';
import { LoginCommand } from 'src/auth/applications/ports/in/login-command';
import { BusinessError } from 'src/auth/domain/business-error';
import { AccountJsonResponse } from './json/account-response';

@Controller('auth/v1')
export class LoginController {
  constructor(private service: LoginService) {}

  @Post('/login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginCommand: LoginCommand) {
    const resultOrError = await this.service.login(loginCommand);

    if (resultOrError instanceof BusinessError)
      throw new UnauthorizedException({ error: resultOrError.message });

    const [account, accessToken] = resultOrError;
    const jsonAccount = new AccountJsonResponse(account);

    return {
      account: jsonAccount,
      accessToken,
    };
  }
}
