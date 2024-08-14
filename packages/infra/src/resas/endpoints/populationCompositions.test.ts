import { baseURL } from "..";
import { createClient } from "../../libs/axios";
import * as msw from "../../libs/msw";
import { getPopulationCompositions } from "./populationCompositions";

const server = msw.setup();
const client = createClient(baseURL, "dummy-api-key");

describe("getPopulationCompositions", () => {
  it("正常なレスポンスが返ると Ok が返る", async () => {
    server.use(msw.getPopulationCompositionsApi());

    const result = await getPopulationCompositions(client, {
      prefCode: 1,
      cityCode: "-",
    });

    expect(result.isOk()).toBe(true);
  });

  it("エラーレスポンスが返ると Err が返る", async () => {
    server.use(msw.getPopulationCompositionsApi(msw.forbidden));

    const result = await getPopulationCompositions(client, {
      prefCode: 1,
      cityCode: "-",
    });

    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr().type).toBe("403");
  });
});
