import { UpdateGlobalConfigDto } from '../dto/update-global-config.dto';
import { GlobalConfig } from '../entities/global-config.entity';

/**
 * DI用トークン
 */
export const GLOBAL_CONFIG_REPOSITORY = Symbol('di-token');

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
   *
   * @param updateGlobalConfigDto 更新データ
   * @returns グローバル設定のPromise
   */
  updateConfig(
    updateGlobalConfigDto: UpdateGlobalConfigDto,
  ): Promise<GlobalConfig>;
}
