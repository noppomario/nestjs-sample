import { ResponseMessageMap } from '../constants/response-message-map';

/**
 * 共通レスポンス定義
 * 成功時：Interceptorでレスポンス
 * エラー時: ExceptionFillterでレスポンス
 *
 * レスポンス形式：
 * {
 *   statusCode:200/201,
 *   message: '処理が成功しました。',
 *   data:[
 *     { 対応データ },
 *     ...
 *   ]
 *   errors: [
 *     '',
 *     ...
 *   ]
 * }
 *
 */
export class CommonResponseDto {
  /**
   * ステータスコード
   */
  private statusCode = 200;

  /**
   * メッセージ
   */
  private message = ResponseMessageMap.get(200);

  /**
   * レスポンスデータ
   */
  private data: any[] = [];

  /**
   * エラー詳細
   */
  private errors: string[] = [];

  /**
   * 共通レスポンスのコンストラクタ
   *
   * @param code statusCode
   * @param data レスポンスデータ(正常系)
   * @param error エラーデータ(準正常/異常系)
   */
  constructor(code: number, data: any, error: any) {
    if (code >= 400) {
      this.createErrorResponse(code, error);
    } else {
      this.createSuccessResponse(code, data);
    }
  }

  private createSuccessResponse(code: number, data: any) {
    // statusCode
    this.statusCode = code;

    // message
    this.message = ResponseMessageMap.get(code);

    // data
    if (Array.isArray(data)) {
      this.data = data;
    } else if (data) {
      this.data.push(data);
    } else {
      this.data = [];
    }

    // errors
    this.errors = [];
  }

  private createErrorResponse(code: number, error: any) {
    // statusCode
    this.statusCode = code;

    // message
    const msg = ResponseMessageMap.get(code);
    if (msg) {
      this.message = msg;
    } else if (code >= 400 && code < 500) {
      // 未定義のエラーが発生した場合は400エラーに丸める
      this.message = ResponseMessageMap.get(400);
    } else {
      // 未定義のエラーが発生した場合は500エラーに丸める
      this.message = ResponseMessageMap.get(500);
    }

    // data
    this.data = [];

    // errors
    if (error && code === 400) {
      if (Array.isArray(error.message)) {
        this.errors = error.message;
      } else {
        this.errors.push(error.message);
      }
    } else {
      this.errors = [];
    }
  }
}
