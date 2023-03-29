import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginCommand {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
