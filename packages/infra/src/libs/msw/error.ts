import type {
  BadRequestResponse,
  ForbiddentResponse,
  NotFoundtResponse,
} from "../../resas";

export const batRequest: BadRequestResponse = "400";

export const forbidden: ForbiddentResponse = {
  statusCode: "403",
  message: "Forbidden.",
  description: "",
};

export const notFound: NotFoundtResponse = {
  statusCode: "404",
  message: "404. That's an error.",
  description: "",
};
