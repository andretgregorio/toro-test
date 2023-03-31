export class BusinessError {
  readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export type BusinessErrorOr<T> = BusinessError | T;
