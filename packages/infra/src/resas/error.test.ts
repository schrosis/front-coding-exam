import { type ErrorResponse, ResasError } from "./error";

describe("ResasError", () => {
  describe("of メソッド", () => {
    const testCases: {
      case: string;
      errorResponse: ErrorResponse;
      expectedType: string;
    }[] = [
      {
        case: "400エラーを正しく処理する",
        errorResponse: "400",
        expectedType: "400",
      },
      {
        case: "403エラーを正しく処理する",
        errorResponse: {
          statusCode: "403",
          message: "Forbidden.",
          description: "アクセスが拒否されました。",
        },
        expectedType: "403",
      },
      {
        case: "404エラー（文字列）を正しく処理する",
        errorResponse: "404",
        expectedType: "404",
      },
      {
        case: "404エラー（オブジェクト）を正しく処理する",
        errorResponse: {
          statusCode: "404",
          message: "404. That's an error.",
          description: "ページが見つかりません。",
        },
        expectedType: "404",
      },
    ];

    test.each(testCases)("$case", ({ errorResponse, expectedType }) => {
      const error = ResasError.of(errorResponse);

      expect(error.type).toBe(expectedType);
      expect(error.errorResponse).toBe(errorResponse);
    });
  });

  describe("unexpected メソッド", () => {
    it("予期しないエラーを正しく処理する", () => {
      const error = ResasError.unexpected();

      expect(error.type).toBe("unexpected");
      expect(error.errorResponse).toBeUndefined();
    });
  });
});
