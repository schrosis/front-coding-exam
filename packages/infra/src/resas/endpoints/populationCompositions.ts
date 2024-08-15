import type { AxiosInstance } from "axios";
import { type Result, err, ok } from "neverthrow";
import { z } from "zod";
import { ResasError, errorResponse } from "../error";

const populationCompositionsApiResponse = z.object({
  message: z.null(),
  result: z.object({
    boundaryYear: z.number().int().positive(),
    data: z.tuple([
      z.object({
        label: z.literal("総人口"),
        data: z.array(
          z.object({
            year: z.number().int().positive(),
            value: z.number().int().positive(),
          }),
        ),
      }),
      z.object({
        label: z.literal("年少人口"),
        data: z.array(
          z.object({
            year: z.number().int().positive(),
            value: z.number().int().positive(),
            rate: z.number().positive(),
          }),
        ),
      }),
      z.object({
        label: z.literal("生産年齢人口"),
        data: z.array(
          z.object({
            year: z.number().int().positive(),
            value: z.number().int().positive(),
            rate: z.number().positive(),
          }),
        ),
      }),
      z.object({
        label: z.literal("老年人口"),
        data: z.array(
          z.object({
            year: z.number().int().positive(),
            value: z.number().int().positive(),
            rate: z.number().positive(),
          }),
        ),
      }),
    ]),
  }),
});

export type PopulationCompositionsApiResponse = z.infer<
  typeof populationCompositionsApiResponse
>;

export const getPopulationCompositions = async (
  client: AxiosInstance,
  params: {
    prefCode: number;
    cityCode: number | "-";
    addArea?: { prefCode: number; cityCode?: number }[];
  },
): Promise<Result<PopulationCompositionsApiResponse, ResasError>> => {
  const responseBody = await (
    await client.get("api/v1/population/composition/perYear", {
      params: {
        prefCode: params.prefCode,
        cityCode: params.cityCode,
        addArea: params.addArea
          ?.map((area) => `${area.prefCode}_${area.cityCode ?? ""}`)
          .join(","),
      },
    })
  ).data;

  const parsed = populationCompositionsApiResponse.safeParse(responseBody);
  if (parsed.success) {
    return ok(parsed.data);
  }

  const parsedError = errorResponse.safeParse(responseBody);
  if (parsedError.success) {
    return err(ResasError.of(parsedError.data));
  }

  return err(ResasError.unexpected());
};
