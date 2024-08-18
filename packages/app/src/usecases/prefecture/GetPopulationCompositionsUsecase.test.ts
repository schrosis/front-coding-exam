import {
  Composition,
  PopulationComposition,
  type PopulationCompositionRepository,
} from "@front-coding-exam/domain";
import { PrefectureId } from "@front-coding-exam/domain";
import { GetPopulationCompositionsUsecase } from "./GetPopulationCompositionsUsecase";

describe("GetPopulationCompositionsUsecase", () => {
  it("execute メソッドが正しく動作する", async () => {
    const prefectureId = PrefectureId.of(1)._unsafeUnwrap();
    const mockRepository: PopulationCompositionRepository = {
      find: jest
        .fn()
        .mockResolvedValue(
          PopulationComposition.reconstruct(prefectureId, [
            Composition.reconstruct(2020, 1000, 200, 500, 300)._unsafeUnwrap(),
            Composition.reconstruct(2021, 1050, 210, 510, 330)._unsafeUnwrap(),
          ]),
        ),
    };

    const usecase = new GetPopulationCompositionsUsecase(mockRepository);
    const result = await usecase.execute(prefectureId.value);

    expect(result.isOk()).toBeTruthy();
    expect(result._unsafeUnwrap()).toEqual({
      prefectureId: 1,
      compositions: new Map([
        [
          2020,
          {
            year: 2020,
            totalPopulation: 1000,
            youngPopulation: 200,
            workingAgePopulation: 500,
            olderPopulation: 300,
          },
        ],
        [
          2021,
          {
            year: 2021,
            totalPopulation: 1050,
            youngPopulation: 210,
            workingAgePopulation: 510,
            olderPopulation: 330,
          },
        ],
      ]),
    });
  });

  it("PrefectureId のバリデーションエラーが発生する場合", async () => {
    const mockRepository = {
      find: jest.fn(),
    };

    const usecase = new GetPopulationCompositionsUsecase(mockRepository);
    const result = await usecase.execute(-1);

    expect(result.isErr()).toBeTruthy();
    expect(result._unsafeUnwrapErr()).toBeTruthy();
  });
});
