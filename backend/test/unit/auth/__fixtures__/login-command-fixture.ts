import { faker } from '@faker-js/faker/locale/pt_BR';
import { LoginCommand } from 'src/auth/applications/ports/in/login-command';

export class LoginCommandFixture {
  protected email: string;
  protected password: string;

  constructor() {
    this.email = faker.internet.email();
    this.password = faker.internet.password();
  }

  build(): LoginCommand {
    return new LoginCommand(this.email, this.password);
  }

  withEmail(email: string): LoginCommandFixture {
    this.email = email;
    return this;
  }

  withPassword(password: string): LoginCommandFixture {
    this.password = password;
    return this;
  }
}
