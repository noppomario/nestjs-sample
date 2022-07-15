/**
 * 設定ファイルを扱うリポジトリの共通処理のインターフェース
 */
export interface ParameterFileSharedRepository {
  /**
   * 設定ファイルをパースしてkey/valueのMapを返す
   *
   * @param filePath 設定ファイルのパス
   * @returns 設定Map
   */
  parse(filePath: string): Promise<Map<string, string>>;
}
