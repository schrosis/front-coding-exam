import { http, HttpResponse } from "msw";
import { baseURL } from "../../resas";
import type { PopulationCompositionsApiResponse } from "../../resas/endpoints/populationCompositions";
import type { PrefecturesApiResponse } from "../../resas/endpoints/prefectures";
import type { ErrorResponse } from "../../resas/error";

export const getPrefecturesApi = (errorResponse?: ErrorResponse) => {
  return http.get(new URL("api/v1/prefectures", baseURL).toString(), () => {
    const response: PrefecturesApiResponse = {
      message: null,
      result: [
        { prefCode: 1, prefName: "北海道" },
        { prefCode: 2, prefName: "青森県" },
      ],
    };

    return HttpResponse.json(errorResponse ?? response, { status: 200 });
  });
};

export const getPopulationCompositionsApi = (errorResponse?: ErrorResponse) => {
  return http.get(
    new URL("api/v1/population/composition/perYear", baseURL).toString(),
    () => {
      const response: PopulationCompositionsApiResponse = {
        message: null,
        result: {
          boundaryYear: 2020,
          data: [
            {
              label: "総人口",
              data: [
                {
                  year: 2010,
                  value: 10888,
                },
                {
                  year: 2015,
                  value: 10133,
                },
                {
                  year: 2020,
                  value: 9302,
                },
              ],
            },
            {
              label: "年少人口",
              data: [
                {
                  year: 2010,
                  value: 1321,
                  rate: 12.13,
                },
                {
                  year: 2015,
                  value: 1144,
                  rate: 11.29,
                },
                {
                  year: 2020,
                  value: 936,
                  rate: 10.06,
                },
              ],
            },
            {
              label: "生産年齢人口",
              data: [
                {
                  year: 2010,
                  value: 6387,
                  rate: 58.66,
                },
                {
                  year: 2015,
                  value: 5538,
                  rate: 54.65,
                },
                {
                  year: 2020,
                  value: 4756,
                  rate: 51.13,
                },
              ],
            },
            {
              label: "老年人口",
              data: [
                {
                  year: 2010,
                  value: 3179,
                  rate: 29.2,
                },
                {
                  year: 2015,
                  value: 3442,
                  rate: 33.97,
                },
                {
                  year: 2020,
                  value: 3578,
                  rate: 38.46,
                },
              ],
            },
          ],
        },
      };

      return HttpResponse.json(errorResponse ?? response, { status: 200 });
    },
  );
};
