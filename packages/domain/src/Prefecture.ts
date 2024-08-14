export interface PrefectureRepository {
  all(): Promise<Prefecture[]>;
}

const prefectureSymbol = Symbol();
export class Prefecture {
  [prefectureSymbol] = "Prefecture";

  private constructor(
    readonly prefectureId: PrefectureId,
    readonly name: string,
  ) {}

  static reconstruct(prefectureId: PrefectureId, name: string): Prefecture {
    return new Prefecture(prefectureId, name);
  }

  get class(): string {
    return this[prefectureSymbol];
  }
}

const prefectureIdSymbol = Symbol();
export class PrefectureId {
  private [prefectureIdSymbol] = "PrefectureId";

  private constructor(readonly value: number) {}

  static of(value: number): PrefectureId {
    return new PrefectureId(value);
  }

  get class(): string {
    return this[prefectureIdSymbol];
  }
}
