import type { PrefectureId } from "./Prefecture";

export interface PopulationCompositionRepository {
  find(prefectureId: PrefectureId): Promise<PopulationComposition | null>;
}

export class PopulationComposition {
  readonly class = Symbol("PopulationComposition");

  private constructor(
    readonly prefectureId: PrefectureId,
    readonly compositions: Map<Year, Composition>,
  ) {}

  static reconstruct(
    prefectureId: PrefectureId,
    compositions: Map<Year, Composition>,
  ): PopulationComposition {
    return new PopulationComposition(prefectureId, compositions);
  }
}

export class Composition {
  readonly class = Symbol("Composition");

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
  ): Composition {
    return new Composition(
      year,
      totalPopulation,
      youngPopulation,
      workingAgePopulation,
      olderPopulation,
    );
  }
}

export type Year = number;
