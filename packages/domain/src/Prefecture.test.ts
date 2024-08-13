import { Prefecture, PrefectureId } from "./Prefecture";

describe("PrefectureId", () => {
  describe("of メソッド", () => {
    test("数値で PrefectureId インスタンスを作成できる", () => {
      const id = PrefectureId.of(1);
      expect(id).toBeInstanceOf(PrefectureId);
      expect(id.value).toBe(1);
    });
  });

  test('class プロパティが Symbol("PrefectureId") である', () => {
    const id = PrefectureId.of(1);
    expect(id.class.toString()).toBe("Symbol(PrefectureId)");
  });
});

describe("Prefecture", () => {
  describe("reconstruct メソッド", () => {
    test("PrefectureId と名前で Prefecture インスタンスを作成できる", () => {
      const id = PrefectureId.of(1);
      const name = "東京都";
      const prefecture = Prefecture.reconstruct(id, name);
      expect(prefecture).toBeInstanceOf(Prefecture);
      expect(prefecture.prefectureId).toBe(id);
      expect(prefecture.name).toBe(name);
    });
  });

  test('class プロパティが Symbol("Prefecture") である', () => {
    const id = PrefectureId.of(1);
    const name = "東京都";
    const prefecture = Prefecture.reconstruct(id, name);
    expect(prefecture.class.toString()).toBe("Symbol(Prefecture)");
  });
});
