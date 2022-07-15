import { GlobalConfig } from '../entities/global-config.entity';

/**
 *グローバル設定リポジトリのインターフェース
 */
export interface GlobalConfigRepository {
  /**
   * グローバル設定を取得する
   *
   * @returns グローバル設定のPromise
   */
  findConfig(): Promise<GlobalConfig>;

  /**
   * グローバル設定を更新する
   * - 設定ファイル更新
   * - 設定変更
   *
   * @returns グローバル設定のPromise
   */
  updateConfig(): Promise<GlobalConfig>;
}
