export class LoginError {
  readonly message: string;

  constructor() {
    this.message = 'Invalid email or password';
  }
}
