import { type Result, err, ok } from "neverthrow";
import { DomainError } from "./error";

export interface PrefectureRepository {
  all(): Promise<Result<Prefecture[], DomainError>>;
}

const prefectureSymbol = Symbol();
export class Prefecture {
  [prefectureSymbol] = "Prefecture";

  private constructor(
    readonly prefectureId: PrefectureId,
    readonly name: string,
  ) {}

  static reconstruct(
    prefectureId: PrefectureId,
    name: string,
  ): Result<Prefecture, DomainError> {
    if (name.trim() === "") {
      return err(new DomainError("都道府県名は空であってはいけません。"));
    }

    return ok(new Prefecture(prefectureId, name));
  }

  get class(): string {
    return this[prefectureSymbol];
  }
}

const prefectureIdSymbol = Symbol();
export class PrefectureId {
  private [prefectureIdSymbol] = "PrefectureId";

  private constructor(readonly value: number) {}

  static of(value: number): Result<PrefectureId, DomainError> {
    if (!Number.isInteger(value) || value < 1) {
      return err(
        new DomainError("都道府県IDは1以上の整数である必要があります。"),
      );
    }

    return ok(new PrefectureId(value));
  }

  get class(): string {
    return this[prefectureIdSymbol];
  }
}
