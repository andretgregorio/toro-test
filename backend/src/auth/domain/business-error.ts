interface BusinessErrorConstructor {
  code: number;
  message: string;
}

export class BusinessError {
  readonly code: number;
  readonly message: string;

  constructor({ code, message }: BusinessErrorConstructor) {
    this.code = code;
    this.message = message;
  }
}
