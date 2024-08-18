import type { PrefectureRepository } from "@front-coding-exam/domain";
import type { Result } from "neverthrow";
import { AppError } from "../../index";

export class GetPrefectureUsecase {
  constructor(private readonly prefectureRepository: PrefectureRepository) {}

  async execute(): Promise<Result<OutputData, AppError>> {
    return (await this.prefectureRepository.all())
      .mapErr(AppError.fromDomainError)
      .map(
        (prefectures): OutputData =>
          prefectures.map((prefecture) => ({
            prefectureId: prefecture.prefectureId.value,
            name: prefecture.name,
          })),
      );
  }
}

export type OutputData = {
  prefectureId: number;
  name: string;
}[];
