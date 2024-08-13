import { Composition, PopulationComposition } from "./PopulationComposition";
import { PrefectureId } from "./Prefecture";

describe("PopulationComposition", () => {
  describe("reconstruct メソッド", () => {
    test("PrefectureId と compositions で PopulationComposition インスタンスを作成できる", () => {
      const prefectureId = PrefectureId.of(1);
      const compositions = new Map<number, Composition>();
      compositions.set(
        2020,
        Composition.reconstruct(2020, 1000000, 200000, 600000, 200000),
      );
      compositions.set(
        2021,
        Composition.reconstruct(2021, 1010000, 190000, 610000, 210000),
      );

      const populationComposition = PopulationComposition.reconstruct(
        prefectureId,
        compositions,
      );

      expect(populationComposition).toBeInstanceOf(PopulationComposition);
      expect(populationComposition.prefectureId).toBe(prefectureId);
      expect(populationComposition.compositions).toBe(compositions);
    });
  });

  test('class プロパティが Symbol("PopulationComposition") である', () => {
    const prefectureId = PrefectureId.of(1);
    const compositions = new Map<number, Composition>();
    const populationComposition = PopulationComposition.reconstruct(
      prefectureId,
      compositions,
    );

    expect(populationComposition.class.toString()).toBe(
      "Symbol(PopulationComposition)",
    );
  });
});

describe("Composition", () => {
  describe("reconstruct メソッド", () => {
    test("年と各人口データで Composition インスタンスを作成できる", () => {
      const year = 2020;
      const totalPopulation = 1000000;
      const youngPopulation = 200000;
      const workingAgePopulation = 600000;
      const olderPopulation = 200000;

      const composition = Composition.reconstruct(
        year,
        totalPopulation,
        youngPopulation,
        workingAgePopulation,
        olderPopulation,
      );

      expect(composition).toBeInstanceOf(Composition);
      expect(composition.year).toBe(year);
      expect(composition.totalPopulation).toBe(totalPopulation);
      expect(composition.youngPopulation).toBe(youngPopulation);
      expect(composition.workingAgePopulation).toBe(workingAgePopulation);
      expect(composition.olderPopulation).toBe(olderPopulation);
    });
  });

  test('class プロパティが Symbol("Composition") である', () => {
    const composition = Composition.reconstruct(
      2020,
      1000000,
      200000,
      600000,
      200000,
    );

    expect(composition.class.toString()).toBe("Symbol(Composition)");
  });
});
