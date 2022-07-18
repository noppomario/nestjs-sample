import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DITokenConstants } from 'src/common/constants/di-token-constants';
import { ParameterFileSharedRepository } from 'src/shared-modules/parameter-file-shared/parameter-file-shared.repository';
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
    @Inject(DITokenConstants.PARAMETER_FILE_SHARED_REPOSITORY)
    private readonly paramsFileRepo: ParameterFileSharedRepository,
    private readonly configService: ConfigService,
  ) {
    this.globalConfigFilePath = configService.get<string>(
      'FILE_PATH_GLOBAL_CONFIG',
    );
  }

  async findConfig(): Promise<GlobalConfig> {
    const confMap = await this.paramsFileRepo.parse(this.globalConfigFilePath);
    return GlobalConfig.fromMap(confMap);
  }

  async updateConfig(
    updateGlobalConfigDto: UpdateGlobalConfigDto,
  ): Promise<GlobalConfig> {
    const confMap = await this.paramsFileRepo.parse(this.globalConfigFilePath);
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

    await this.paramsFileRepo.update(this.globalConfigFilePath, confMap);

    return GlobalConfig.fromMap(confMap);
  }
}
