import { Prefecture, PrefectureId } from "./Prefecture";
import { DomainError } from "./error";

describe("PrefectureId", () => {
  test("有効な値で作成できる", () => {
    const result = PrefectureId.of(1);

    expect(result.isOk()).toBe(true);
    const prefectureId = result._unsafeUnwrap();
    expect(prefectureId.value).toBe(1);
    expect(prefectureId.class).toBe("PrefectureId");
  });

  test.each([
    { case: "0以下の値", input: 0 },
    { case: "小数", input: 1.5 },
  ])("$caseでエラーになる", ({ input }) => {
    const result = PrefectureId.of(input);

    expect(result.isErr()).toBe(true);
    const error = result._unsafeUnwrapErr();
    expect(error).toBeInstanceOf(DomainError);
    expect(error.message).toBe("都道府県IDは1以上の整数である必要があります。");
  });
});

describe("Prefecture", () => {
  test("有効な値で作成できる", () => {
    const prefectureId = PrefectureId.of(1)._unsafeUnwrap();

    const result = Prefecture.reconstruct(prefectureId, "東京都");

    expect(result.isOk()).toBe(true);
    const prefecture = result._unsafeUnwrap();
    expect(prefecture.prefectureId).toBe(prefectureId);
    expect(prefecture.name).toBe("東京都");
    expect(prefecture.class).toBe("Prefecture");
  });

  test.each([
    { case: "空の名前", input: "" },
    { case: "空白のみの名前", input: "   " },
  ])("$caseでエラーになる", ({ input }) => {
    const prefectureId = PrefectureId.of(1)._unsafeUnwrap();

    const result = Prefecture.reconstruct(prefectureId, input);

    expect(result.isErr()).toBe(true);
    const error = result._unsafeUnwrapErr();
    expect(error).toBeInstanceOf(DomainError);
    expect(error.message).toBe("都道府県名は空であってはいけません。");
  });
});
