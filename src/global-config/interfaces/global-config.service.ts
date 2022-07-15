import { UpdateGlobalConfigDto } from '../dto/update-global-config.dto';
import { GlobalConfig } from '../entities/global-config.entity';

/**
 * グローバル設定サービスのインターフェース
 */
export interface GlobalConfigService {
  /**
   * グローバル設定の取得処理
   *
   * @returns グローバル設定のPromise
   */
  findConfig(): Promise<GlobalConfig>;

  /**
   * グローバル設定の更新処理
   *
   * @param updateGlobalConfigDto 更新データ
   * @returns グローバル設定のPromise
   */
  updateConfig(
    updateGlobalConfigDto: UpdateGlobalConfigDto,
  ): Promise<GlobalConfig>;
}
