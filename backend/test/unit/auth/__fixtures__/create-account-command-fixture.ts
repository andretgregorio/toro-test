import { faker } from '@faker-js/faker/locale/pt_BR';
import { CreateAccountCommand } from 'src/auth/applications/ports/in/create-account-command';

export class CreateAccountCommandFixture {
  protected email: string;
  protected password: string;

  constructor() {
    this.email = faker.internet.email();
    this.password = faker.internet.password();
  }

  build(): CreateAccountCommand {
    return new CreateAccountCommand(this.email, this.password);
  }

  withEmail(email: string): CreateAccountCommandFixture {
    this.email = email;
    return this;
  }

  withPassword(password: string): CreateAccountCommandFixture {
    this.password = password;
    return this;
  }
}
