import { Inject, Injectable } from '@nestjs/common';
import { DITokenConstants } from 'src/common/constants/di-token-constants';
import { ParameterFileSharedRepository } from 'src/shared-modules/parameter-file-shared/parameter-file-shared.repository';
import { UpdateGlobalConfigDto } from './dto/update-global-config.dto';
import { GlobalConfig } from './entities/global-config.entity';
import { GlobalConfigRepository } from './interfaces/global-config.repository';

/**
 * グローバル設定リポジトリの実装クラス
 */
@Injectable()
export class GlobalConfigRepositoryImpl implements GlobalConfigRepository {
  constructor(
    @Inject(DITokenConstants.PARAMETER_FILE_SHARED_REPOSITORY)
    private readonly paramsFileRepo: ParameterFileSharedRepository,
  ) {}

  /**
   * 設定ファイルのパス
   */
  private readonly globalConfigFilePath = 'db/global-config.conf';

  async findConfig(): Promise<GlobalConfig> {
    const confMap = await this.paramsFileRepo.parse(this.globalConfigFilePath);
    return GlobalConfig.fromMap(confMap);
  }

  async updateConfig(
    updateGlobalConfigDto: UpdateGlobalConfigDto,
  ): Promise<GlobalConfig> {
    const confMap = await this.paramsFileRepo.parse(this.globalConfigFilePath);
    if (updateGlobalConfigDto.globalIpAddress) {
      confMap.set('GLOBAL_IP_ADDRESS', updateGlobalConfigDto.globalIpAddress);
    }
    if (updateGlobalConfigDto.privateIpAddress) {
      confMap.set('PRIVATE_IP_ADDRESS', updateGlobalConfigDto.privateIpAddress);
    }

    await this.paramsFileRepo.update(this.globalConfigFilePath, confMap);

    return GlobalConfig.fromMap(confMap);
  }
}
