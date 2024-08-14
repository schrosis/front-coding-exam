import { baseURL } from "..";
import { createClient } from "../../libs/axios";
import * as msw from "../../libs/msw";
import { getPrefectures } from "./prefectures";

const server = msw.setup();
const client = createClient(baseURL, "dummy-api-key");

describe("getPrefectures", () => {
  it("正常なレスポンスが返ると Ok が返る", async () => {
    server.use(msw.getPrefecturesApi());

    const result = await getPrefectures(client);

    expect(result.isOk()).toBe(true);
  });

  it("エラーレスポンスをが返ると Err が返る", async () => {
    server.use(msw.getPrefecturesApi(msw.forbidden));

    const result = await getPrefectures(client);

    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr().type).toBe("403");
  });
});
