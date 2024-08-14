import { http, HttpResponse } from "msw";
import { baseURL } from "../../resas";
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
