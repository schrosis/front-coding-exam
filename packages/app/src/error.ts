import type { DomainError } from "@front-coding-exam/domain";

export class AppError extends Error {
  constructor(
    message: string,
    readonly previous?: Error,
  ) {
    super(message);
  }

  static fromDomainError(domainError: DomainError): AppError {
    return new AppError(domainError.message, domainError);
  }
}
