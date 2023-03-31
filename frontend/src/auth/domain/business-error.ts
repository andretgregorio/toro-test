export interface BusinessError {
  readonly message: string;
}

export type BusinessErrorOr<T> = BusinessError | T;
