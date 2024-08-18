import { type NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const isProduction = process.env.NODE_ENV === "production";
  if (!isProduction) {
    return NextResponse.next();
  }

  const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER;
  const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD;
  if (
    typeof BASIC_AUTH_USER === "undefined" ||
    typeof BASIC_AUTH_PASSWORD === "undefined"
  ) {
    return new NextResponse("503 Service Unavailable", {
      status: 503,
    });
  }

  const unauthorizedError = new NextResponse("401 Unauthorized", {
    status: 401,
    headers: {
      "WWW-authenticate": 'Basic realm="http-auth@front-coding-exam"',
    },
  });
  const authorization = req.headers.get("authorization");
  if (authorization === null || !authorization.startsWith("Basic ")) {
    return unauthorizedError;
  }

  const basicAuth = authorization.split(" ")[1];
  const [user, password] = atob(basicAuth).split(":");

  if (user !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASSWORD) {
    return unauthorizedError;
  }

  return NextResponse.next();
};
