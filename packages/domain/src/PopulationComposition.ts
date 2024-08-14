import { type Result, err, ok } from "neverthrow";
import type { PrefectureId } from "./Prefecture";
import { DomainError } from "./error";

export interface PopulationCompositionRepository {
  find(
    prefectureId: PrefectureId,
  ): Promise<Result<PopulationComposition, DomainError>>;
}

const populationCompositionSymbol = Symbol();
export class PopulationComposition {
  private [populationCompositionSymbol] = "PopulationComposition";

  private constructor(
    readonly prefectureId: PrefectureId,
    readonly compositions: Map<Year, Composition>,
  ) {}

  static reconstruct(
    prefectureId: PrefectureId,
    compositions: Composition[],
  ): Result<PopulationComposition, DomainError> {
    const compositionMap = new Map<Year, Composition>();

    for (const composition of compositions) {
      if (typeof compositionMap.get(composition.year) !== "undefined") {
        return err(new DomainError("重複する年があります。"));
      }
      compositionMap.set(composition.year, composition);
    }

    return ok(new PopulationComposition(prefectureId, compositionMap));
  }

  get class(): string {
    return this[populationCompositionSymbol];
  }
}

const compositionSymbol = Symbol();
export class Composition {
  private [compositionSymbol] = "Composition";

  private constructor(
    readonly year: Year,
    readonly totalPopulation: number,
    readonly youngPopulation: number,
    readonly workingAgePopulation: number,
    readonly olderPopulation: number,
  ) {}

  static reconstruct(
    year: Year,
    totalPopulation: number,
    youngPopulation: number,
    workingAgePopulation: number,
    olderPopulation: number,
  ): Result<Composition, DomainError> {
    const sum = youngPopulation + workingAgePopulation + olderPopulation;
    if (sum !== totalPopulation) {
      return err(new DomainError("各人口の合計が総人口と一致しません。"));
    }

    return ok(
      new Composition(
        year,
        totalPopulation,
        youngPopulation,
        workingAgePopulation,
        olderPopulation,
      ),
    );
  }

  get class(): string {
    return this[compositionSymbol];
  }
}

export type Year = number;
