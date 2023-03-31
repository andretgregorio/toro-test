export class RequestError {
  constructor(
    readonly message: string,
    readonly httpStatusCode: number,
    readonly payload: any
  ) {}
}
