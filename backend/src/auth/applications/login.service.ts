import { Inject, Injectable } from '@nestjs/common';
import {
  FindAccountByEmailPort,
  FindAccountByEmailPortToken,
} from './ports/out/find-account-by-email';

@Injectable()
export class LoginService {
  constructor(
    @Inject(FindAccountByEmailPortToken)
    private findAccountPort: FindAccountByEmailPort,
  ) {}

  async login(email: string, password: string) {}
}
