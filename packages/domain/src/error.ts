export class DomainError extends Error {
  constructor(
    message: string,
    readonly previous?: Error,
  ) {
    super(message);
  }
}
