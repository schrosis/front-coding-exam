import {
  type PopulationCompositionRepository,
  PrefectureId,
  type Year,
} from "@front-coding-exam/domain";
import { type Result, safeTry } from "neverthrow";
import { AppError } from "../../index";

export class GetPopulationCompositionsUsecase {
  constructor(
    private readonly populationCompositionRepository: PopulationCompositionRepository,
  ) {}

  async execute(prefectureId: number): Promise<Result<OutputData, AppError>> {
    const findPopulationComposition = this.populationCompositionRepository.find;

    return safeTry(async function* () {
      const id = yield* PrefectureId.of(prefectureId)
        .mapErr(AppError.fromDomainError)
        .safeUnwrap();

      return (await findPopulationComposition(id))
        .mapErr(AppError.fromDomainError)
        .map(
          (populationComposition): OutputData => ({
            prefectureId: prefectureId,
            compositions: new Map(
              [...populationComposition.compositions].map(
                ([year, composition]) => [
                  year,
                  {
                    year,
                    totalPopulation: composition.totalPopulation,
                    youngPopulation: composition.youngPopulation,
                    workingAgePopulation: composition.workingAgePopulation,
                    olderPopulation: composition.olderPopulation,
                  },
                ],
              ),
            ),
          }),
        );
    });
  }
}

type OutputData = {
  prefectureId: number;
  compositions: Map<
    Year,
    {
      year: Year;
      totalPopulation: number;
      youngPopulation: number;
      workingAgePopulation: number;
      olderPopulation: number;
    }
  >;
};
