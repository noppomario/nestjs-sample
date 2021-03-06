/**
 * DI用トークン
 */
export const CONF_FILE_REPOSITORY = Symbol('di-token');

/**
 * 設定ファイルリポジトリのインターフェース
 */
export interface ConfFileRepository {
  /**
   * 設定ファイルをパースしてkey/valueのMapを返す
   *
   * @param filePath 設定ファイルのパス
   * @returns 設定Map
   */
  parse(filePath: string): Promise<Map<string, string>>;

  /**
   * 設定ファイルを更新してkey/valueのMapを返す
   *
   * @param filePath 設定ファイルのパス
   * @param paramsMap 設定Map
   */
  update(
    filePath: string,
    paramsMap: Map<string, string>,
  ): Promise<Map<string, string>>;
}
