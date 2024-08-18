import {
  DomainError,
  Prefecture,
  PrefectureId,
  type PrefectureRepository,
} from "@front-coding-exam/domain";
import { err, ok } from "neverthrow";
import { GetPrefectureUsecase, type OutputData } from "./GetPrefectureUsecase";

describe("GetPrefectureUsecase", () => {
  let usecase: GetPrefectureUsecase;
  let repository: PrefectureRepository;

  beforeEach(() => {
    repository = {} as PrefectureRepository;
    usecase = new GetPrefectureUsecase(repository);
  });

  it("should return prefectures", async () => {
    const prefectureId = 1;
    const prefectureName = "東京都";
    const prefectures: Prefecture[] = [
      Prefecture.reconstruct(
        PrefectureId.of(prefectureId)._unsafeUnwrap(),
        prefectureName,
      )._unsafeUnwrap(),
    ];

    repository.all = jest
      .fn()
      .mockImplementation()
      .mockResolvedValue(ok(prefectures));

    const result = await usecase.execute();

    expect(result.isOk()).toBe(true);
    const expected: OutputData = [
      {
        prefectureId,
        name: prefectureName,
      },
    ];
    expect(result._unsafeUnwrap()).toEqual(expected);
  });

  it("should handle error", async () => {
    const errorMessage = "test error message";
    const error = new DomainError(errorMessage);

    repository.all = jest
      .fn()
      .mockImplementation()
      .mockResolvedValue(err(error));

    const result = await usecase.execute();

    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr().message).toEqual(errorMessage);
    expect(result._unsafeUnwrapErr().previous).toEqual(error);
  });
});
