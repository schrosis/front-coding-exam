import { z } from "zod";

export const badRequestResponse = z.literal("400");
export type BadRequestResponse = z.infer<typeof badRequestResponse>;

export const forbiddentResponse = z.object({
  statusCode: z.literal("403"),
  message: z.literal("Forbidden."),
  description: z.string(),
});
export type ForbiddentResponse = z.infer<typeof forbiddentResponse>;

export const notFoundtResponse = z.union([
  z.literal("404"),
  z.object({
    statusCode: z.literal("404"),
    message: z.literal("404. That's an error."),
    description: z.string(),
  }),
]);
export type NotFoundtResponse = z.infer<typeof notFoundtResponse>;

export const errorResponse = z.union([
  badRequestResponse,
  forbiddentResponse,
  notFoundtResponse,
]);
export type ErrorResponse = z.infer<typeof errorResponse>;

export class ResasError {
  private constructor(
    readonly type: "400" | "403" | "404" | "unexpected",
    readonly errorResponse?: ErrorResponse,
  ) {}

  static of(errorResponse: ErrorResponse): ResasError {
    if (errorResponse === "400") {
      return new ResasError("400", errorResponse);
    }

    if (
      typeof errorResponse === "object" &&
      errorResponse.statusCode === "403"
    ) {
      return new ResasError("403", errorResponse);
    }

    if (
      errorResponse === "404" ||
      (typeof errorResponse === "object" && errorResponse.statusCode === "404")
    ) {
      return new ResasError("403", errorResponse);
    }

    const never: never = errorResponse;
    return never;
  }

  static unexpected(): ResasError {
    return new ResasError("unexpected", undefined);
  }
}
