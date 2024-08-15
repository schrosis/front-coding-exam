import {
  Composition,
  DomainError,
  PopulationComposition,
  type PopulationCompositionRepository,
  type PrefectureId,
} from "@front-coding-exam/domain";
import { Result, err, safeTry } from "neverthrow";
import type { ResasApiClient } from "../resas";

export class PopulationCompositionsResasApiRepository
  implements PopulationCompositionRepository
{
  constructor(readonly resasApi: ResasApiClient) {}

  async find(
    prefectureId: PrefectureId,
  ): Promise<Result<PopulationComposition, DomainError>> {
    const res = await this.resasApi.getPopulationCompositions({
      prefCode: prefectureId.value,
      cityCode: "-",
    });

    if (res.isErr()) {
      return err(new DomainError("人口構成の取得に失敗しました。", res.error));
    }

    const INDEX = {
      totalPopulation: 0,
      youngPopulation: 1,
      workingAgePopulation: 2,
      olderPopulation: 3,
    } as const;

    const data = res.value.result.data;

    return safeTry(function* () {
      const compositions = yield* Result.combine(
        data[INDEX.totalPopulation].data.map((totalPopulation, index) => {
          const year = totalPopulation.year;
          const youngPopulation = data[INDEX.youngPopulation].data[index];
          const workingAgePopulation =
            data[INDEX.workingAgePopulation].data[index];
          const olderPopulation = data[INDEX.olderPopulation].data[index];

          const years = [
            year,
            youngPopulation.year,
            workingAgePopulation.year,
            olderPopulation.year,
          ];
          if (new Set(years).size !== 1) {
            return err(
              new DomainError(
                `${year}年の人口構成データが不正です。${years.toString()}`,
              ),
            );
          }

          return Composition.reconstruct(
            year,
            totalPopulation.value,
            youngPopulation.value,
            workingAgePopulation.value,
            olderPopulation.value,
          );
        }),
      ).safeUnwrap();

      return PopulationComposition.reconstruct(prefectureId, compositions);
    });
  }
}
