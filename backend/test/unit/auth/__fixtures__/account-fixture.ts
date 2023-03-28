import { faker } from '@faker-js/faker/locale/pt_BR';
import { Account } from 'src/auth/domain/account';

export class AccountFixture {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = faker.datatype.number();
    this.email = faker.internet.email();
    this.password = faker.internet.password();
    this.createdAt = faker.date.recent();
    this.updatedAt = faker.date.recent();
  }

  build(): Account {
    return new Account({
      id: this.id,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  withId(id: number): AccountFixture {
    this.id = id;
    return this;
  }

  withEmail(email: string): AccountFixture {
    this.email = email;
    return this;
  }

  withPassword(password: string): AccountFixture {
    this.password = password;
    return this;
  }
}
