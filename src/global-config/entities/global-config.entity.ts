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
    entity.globalIpAddress = map.get('GLOBAL_IP_ADDRESS');
    entity.privateIpAddress = map.get('PRIVATE_IP_ADDRESS');

    return entity;
  }
}
