import { Composition, PopulationComposition } from "./PopulationComposition";
import { PrefectureId } from "./Prefecture";
import { DomainError } from "./error";

describe("Composition", () => {
  test("有効な値で作成できる", () => {
    const result = Composition.reconstruct(2020, 1000, 200, 500, 300);

    expect(result.isOk()).toBe(true);
    const composition = result._unsafeUnwrap();
    expect(composition.year).toBe(2020);
    expect(composition.totalPopulation).toBe(1000);
    expect(composition.youngPopulation).toBe(200);
    expect(composition.workingAgePopulation).toBe(500);
    expect(composition.olderPopulation).toBe(300);
    expect(composition.class).toBe("Composition");
  });
});

describe("PopulationComposition", () => {
  test("有効な値で作成できる", () => {
    const prefectureId = PrefectureId.of(1)._unsafeUnwrap();
    const compositions = [
      Composition.reconstruct(2020, 1000, 200, 500, 300)._unsafeUnwrap(),
      Composition.reconstruct(2021, 1030, 210, 510, 310)._unsafeUnwrap(),
    ];

    const result = PopulationComposition.reconstruct(
      prefectureId,
      compositions,
    );

    expect(result.isOk()).toBe(true);
    const populationComposition = result._unsafeUnwrap();
    expect(populationComposition.prefectureId).toBe(prefectureId);
    expect(populationComposition.compositions.size).toBe(2);
    expect(populationComposition.class).toBe("PopulationComposition");
  });

  test("重複する年がある場合、エラーになる", () => {
    const prefectureId = PrefectureId.of(1)._unsafeUnwrap();
    const compositions = [
      Composition.reconstruct(2020, 1000, 200, 500, 300)._unsafeUnwrap(),
      Composition.reconstruct(2020, 1030, 210, 510, 310)._unsafeUnwrap(),
    ];

    const result = PopulationComposition.reconstruct(
      prefectureId,
      compositions,
    );

    expect(result.isErr()).toBe(true);
    const error = result._unsafeUnwrapErr();
    expect(error).toBeInstanceOf(DomainError);
    expect(error.message).toBe("重複する年があります。");
  });
});
