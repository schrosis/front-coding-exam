import {
  DomainError,
  Prefecture,
  PrefectureId,
  type PrefectureRepository,
} from "@front-coding-exam/domain";
import { Result, err } from "neverthrow";
import type { ResasApiClient } from "../resas";

export class PrefectureResasApiRepository implements PrefectureRepository {
  constructor(readonly resasApi: ResasApiClient) {}

  async all(): Promise<Result<Prefecture[], DomainError>> {
    const res = await this.resasApi.getPrefectures();

    if (res.isErr()) {
      return err(new DomainError("都道府県の取得に失敗しました。", res.error));
    }

    return Result.combine(
      res.value.result.map((prefecture) => {
        return Result.combine([PrefectureId.of(prefecture.prefCode)]).andThen(
          ([prefectureId]) =>
            Prefecture.reconstruct(prefectureId, prefecture.prefName),
        );
      }),
    );
  }
}
