export interface PrefectureRepository {
  all(): Promise<Prefecture[]>;
}

export class Prefecture {
  readonly class = Symbol("Prefecture");

  private constructor(
    readonly prefectureId: PrefectureId,
    readonly name: string,
  ) {}

  static reconstruct(prefectureId: PrefectureId, name: string): Prefecture {
    return new Prefecture(prefectureId, name);
  }
}

export class PrefectureId {
  readonly class = Symbol("PrefectureId");

  private constructor(readonly value: number) {}

  static of(value: number): PrefectureId {
    return new PrefectureId(value);
  }
}
