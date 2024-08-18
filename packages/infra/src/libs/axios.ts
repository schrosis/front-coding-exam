import Axios, { type AxiosInstance } from "axios";
import rateLimit from "axios-rate-limit";

export const createClient = (
  baseURL: string,
  apiKey: string,
): AxiosInstance => {
  const instance = Axios.create({
    baseURL: baseURL,
    headers: {
      "X-API-KEY": apiKey,
    },
  });

  return rateLimit(instance, { maxRequests: 5, perMilliseconds: 1000 });
};
