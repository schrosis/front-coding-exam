import Axios, { type AxiosInstance } from "axios";

export const createClient = (baseURL: string, apiKey: string): AxiosInstance =>
  Axios.create({
    baseURL: baseURL,
    headers: {
      "X-API-KEY": apiKey,
    },
  });
