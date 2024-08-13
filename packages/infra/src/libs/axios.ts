import Axios, { type AxiosInstance } from "axios";

export const createClient = (apiKey: string): AxiosInstance =>
  Axios.create({
    baseURL: "https://opendata.resas-portal.go.jp",
    headers: {
      "X-API-KEY": apiKey,
    },
  });
