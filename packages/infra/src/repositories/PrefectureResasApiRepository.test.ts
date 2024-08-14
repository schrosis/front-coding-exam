import { err, ok } from "neverthrow";
import { type ResasApiClient, ResasError } from "../resas";
import { PrefectureResasApiRepository } from "./PrefectureResasApiRepository";

describe("PrefectureResasApiRepository", () => {
  let resasApiMock: jest.Mocked<ResasApiClient>;
  let repository: PrefectureResasApiRepository;

  beforeEach(() => {
    resasApiMock = jest.requireMock("../resas");
    repository = new PrefectureResasApiRepository(resasApiMock);
  });

  test("都道府県の一覧を取得できる", async () => {
    resasApiMock.getPrefectures = jest.fn().mockResolvedValue(
      ok({
        message: null,
        result: [
          { prefCode: 1, prefName: "北海道" },
          { prefCode: 2, prefName: "青森県" },
        ],
      }),
    );

    const result = await repository.all();

    expect(result.isOk()).toBe(true);
    const prefectures = result._unsafeUnwrap();
    expect(prefectures.length).toBe(2);
    expect(prefectures[0].prefectureId.value).toBe(1);
    expect(prefectures[0].name).toBe("北海道");
    expect(prefectures[1].prefectureId.value).toBe(2);
    expect(prefectures[1].name).toBe("青森県");
  });

  test("都道府県の取得に失敗した場合、エラーを返す", async () => {
    resasApiMock.getPrefectures = jest
      .fn()
      .mockResolvedValue(err(ResasError.unexpected()));

    const result = await repository.all();

    expect(result.isErr()).toBe(true);
    const error = result._unsafeUnwrapErr();
    expect(error.message).toBe("都道府県の取得に失敗しました。");
    expect(error.previous).toBeInstanceOf(ResasError);
  });
});
