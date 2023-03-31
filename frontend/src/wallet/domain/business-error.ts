export class BusinessError {
  constructor(public readonly message: string) {
    this.message = message;
  }
}

export type BusinessErrorOr<T> = T | BusinessError;
