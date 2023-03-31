export class UnknownError {
  readonly message: string;

  constructor() {
    this.message = 'An unknown error occurred. Please try again.';
  }
}
