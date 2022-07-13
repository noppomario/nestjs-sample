import { Injectable } from '@nestjs/common';
import { ConfigFileService } from 'src/config-file/config-file.service';
import { GlobalConfig } from './entities/global-config.entity';

@Injectable()
export class GlobalConfigRepository {
  constructor(private readonly configFileService: ConfigFileService) {}

  /**
   * 設定ファイルのパス
   */
  private readonly globalConfigFilePath = 'db/global-config.conf';

  /**
   * 設定ファイルから設定を取得しEntityとして返す
   *
   * @returns
   */
  async findConfig(): Promise<GlobalConfig> {
    const confMap = await this.configFileService.parse(
      this.globalConfigFilePath,
    );
    return GlobalConfig.fromMap(confMap);
  }

  updateConfig() {}
}
