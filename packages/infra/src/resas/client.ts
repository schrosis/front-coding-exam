import { baseURL } from ".";
import { createClient } from "../libs/axios";
import * as prefectures from "./endpoints/prefectures";

export type ResasApiClient = {
  getPrefectures(): ReturnType<typeof prefectures.getPrefectures>;
};

export const createResasApiClient = (apiKey: string): ResasApiClient => {
  const client = createClient(baseURL, apiKey);

  return {
    getPrefectures: () => prefectures.getPrefectures(client),
  };
};
