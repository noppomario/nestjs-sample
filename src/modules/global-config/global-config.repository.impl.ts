import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ConfFileRepository,
  CONF_FILE_REPOSITORY,
} from '../conf-file/conf-file.repository';
import { UpdateGlobalConfigDto } from './dto/update-global-config.dto';
import { GlobalConfig } from './entities/global-config.entity';
import { GlobalConfigConstants } from './global-config.constants';
import { GlobalConfigRepository } from './interfaces/global-config.repository';

/**
 * グローバル設定リポジトリの実装クラス
 */
@Injectable()
export class GlobalConfigRepositoryImpl implements GlobalConfigRepository {
  /**
   * 設定ファイルのパス
   */
  private readonly globalConfigFilePath: string;

  constructor(
    @Inject(CONF_FILE_REPOSITORY)
    private readonly confFileRepo: ConfFileRepository,
    private readonly configService: ConfigService,
  ) {
    this.globalConfigFilePath = configService.get<string>(
      'FILE_PATH_GLOBAL_CONFIG',
    );
  }

  async findConfig(): Promise<GlobalConfig> {
    const confMap = await this.confFileRepo.parse(this.globalConfigFilePath);
    return GlobalConfig.fromMap(confMap);
  }

  async updateConfig(
    updateGlobalConfigDto: UpdateGlobalConfigDto,
  ): Promise<GlobalConfig> {
    const confMap = await this.confFileRepo.parse(this.globalConfigFilePath);
    if (updateGlobalConfigDto.globalIpAddress) {
      confMap.set(
        GlobalConfigConstants.PARAMS_GLOBAL_IP_ADDRESS,
        updateGlobalConfigDto.globalIpAddress,
      );
    }
    if (updateGlobalConfigDto.privateIpAddress) {
      confMap.set(
        GlobalConfigConstants.PARAMS_PRIVATE_IP_ADDRESS,
        updateGlobalConfigDto.privateIpAddress,
      );
    }

    await this.confFileRepo.update(this.globalConfigFilePath, confMap);

    return GlobalConfig.fromMap(confMap);
  }
}
