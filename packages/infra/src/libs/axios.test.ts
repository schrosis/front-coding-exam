import { createClient } from "./axios";

describe("createClient", () => {
  it("作成されたクライアントが正しい設定を持っている", () => {
    const apiKey = "test-api-key";
    const client = createClient(apiKey);

    expect(client.defaults.baseURL).toBe("https://opendata.resas-portal.go.jp");
    expect(client.defaults.headers["X-API-KEY"]).toBe(apiKey);
  });
});
