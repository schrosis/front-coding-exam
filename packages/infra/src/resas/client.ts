import type { AxiosInstance } from "axios";
import { baseURL } from ".";
import { createClient } from "../libs/axios";
import * as populationCompositions from "./endpoints/populationCompositions";
import * as prefectures from "./endpoints/prefectures";

type EndpointFunction<Args extends unknown[], Return> = (
  client: AxiosInstance,
  ...args: Args
) => Return;

type InferClient<
  T extends {
    [K: string]: EndpointFunction<never, unknown>;
  },
> = {
  [K in keyof T]: T[K] extends EndpointFunction<infer Args, infer Return>
    ? (...args: Args) => Return
    : never;
};

export type ResasApiClient = InferClient<{
  getPrefectures: typeof prefectures.getPrefectures;
  getPopulationCompositions: typeof populationCompositions.getPopulationCompositions;
}>;

export const createResasApiClient = (apiKey: string): ResasApiClient => {
  const client = createClient(baseURL, apiKey);

  return {
    getPrefectures: (...args) => prefectures.getPrefectures(client, ...args),
    getPopulationCompositions: (...args) =>
      populationCompositions.getPopulationCompositions(client, ...args),
  };
};
