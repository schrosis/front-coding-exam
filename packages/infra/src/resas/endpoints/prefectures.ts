import type { AxiosInstance } from "axios";
import { type Result, err, ok } from "neverthrow";
import { z } from "zod";
import { ResasError, errorResponse } from "../error";

const prefecturesApiResponse = z.object({
  message: z.null(),
  result: z.array(
    z.object({
      prefCode: z.number(),
      prefName: z.string(),
    }),
  ),
});

export type PrefecturesApiResponse = z.infer<typeof prefecturesApiResponse>;

export const getPrefectures = async (
  client: AxiosInstance,
): Promise<Result<PrefecturesApiResponse, ResasError>> => {
  const responseBody = await (await client.get("api/v1/prefectures")).data;

  const parsed = prefecturesApiResponse.safeParse(responseBody);
  if (parsed.success) {
    return ok(parsed.data);
  }

  const parsedError = errorResponse.safeParse(responseBody);
  if (parsedError.success) {
    return err(ResasError.of(parsedError.data));
  }

  return err(ResasError.unexpected());
};
