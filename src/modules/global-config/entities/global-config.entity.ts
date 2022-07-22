import { GlobalConfigConstants } from '../global-config.constants';

/**
 * グローバル設定
 */
export class GlobalConfig {
  /**
   * グローバルIPアドレス
   */
  globalIpAddress: string;

  /**
   * プライベートIPアドレス
   */
  privateIpAddress: string;

  /**
   * 設定ファイルから取得したMapデータをEntityに変換
   *
   * @param map 設定Map
   * @returns Entity
   */
  static fromMap(map: Map<string, string>): GlobalConfig {
    const entity = new GlobalConfig();
    entity.globalIpAddress = map.get(
      GlobalConfigConstants.PARAMS_GLOBAL_IP_ADDRESS,
    );
    entity.privateIpAddress = map.get(
      GlobalConfigConstants.PARAMS_PRIVATE_IP_ADDRESS,
    );

    return entity;
  }
}
