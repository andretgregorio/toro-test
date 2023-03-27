import { IsEmail, IsStrongPassword } from 'class-validator';
import { passwordConfig } from 'src/auth/domain/password-config';

export class CreateAccountCommand {
  @IsEmail()
  readonly email: string;

  @IsStrongPassword({
    minLength: passwordConfig.minLength,
    minLowercase: passwordConfig.minLowerCase,
    minNumbers: passwordConfig.minNumbers,
    minSymbols: passwordConfig.minSpecialChars,
    minUppercase: passwordConfig.minUpperCase,
  })
  readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
