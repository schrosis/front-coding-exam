import { PrefectureId } from "@front-coding-exam/domain";
import { err, ok } from "neverthrow";
import { type ResasApiClient, ResasError } from "../resas";
import { PopulationCompositionsResasApiRepository } from "./PopulationCompositionResasApiRepository.ts";

describe("PopulationCompositionsResasApiRepository", () => {
  let resasApiMock: jest.Mocked<ResasApiClient>;
  let repository: PopulationCompositionsResasApiRepository;
  let prefectureId: PrefectureId;

  beforeEach(() => {
    resasApiMock = jest.requireMock("../resas");
    repository = new PopulationCompositionsResasApiRepository(resasApiMock);
    prefectureId = PrefectureId.of(1)._unsafeUnwrap();
  });

  test("都道府県の人口構成を取得できる", async () => {
    resasApiMock.getPopulationCompositions = jest.fn().mockResolvedValue(
      ok({
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
      }),
    );

    const result = await repository.find(prefectureId);

    expect(result.isOk()).toBe(true);
    const populationComposition = result._unsafeUnwrap();
    expect(populationComposition.prefectureId.value).toBe(1);
    expect(populationComposition.compositions.size).toBe(3);

    let composition = populationComposition.compositions.get(2010);
    expect(composition).toBeTruthy();
    expect(composition?.totalPopulation).toBe(10888);
    expect(composition?.youngPopulation).toBe(1321);
    expect(composition?.workingAgePopulation).toBe(6387);
    expect(composition?.olderPopulation).toBe(3179);

    composition = populationComposition.compositions.get(2015);
    expect(composition).toBeTruthy();
    expect(composition?.totalPopulation).toBe(10133);
    expect(composition?.youngPopulation).toBe(1144);
    expect(composition?.workingAgePopulation).toBe(5538);
    expect(composition?.olderPopulation).toBe(3442);

    composition = populationComposition.compositions.get(2020);
    expect(composition).toBeTruthy();
    expect(composition?.totalPopulation).toBe(9302);
    expect(composition?.youngPopulation).toBe(936);
    expect(composition?.workingAgePopulation).toBe(4756);
    expect(composition?.olderPopulation).toBe(3578);
  });

  test("都道府県の人口構成の取得に失敗した場合、エラーを返す", async () => {
    resasApiMock.getPopulationCompositions = jest
      .fn()
      .mockResolvedValue(err(ResasError.unexpected()));

    const result = await repository.find(prefectureId);

    expect(result.isErr()).toBe(true);
    const error = result._unsafeUnwrapErr();
    expect(error.message).toBe("人口構成の取得に失敗しました。");
    expect(error.previous).toBeInstanceOf(ResasError);
  });
});
