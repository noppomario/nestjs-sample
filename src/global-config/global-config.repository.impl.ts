import { Inject, Injectable } from '@nestjs/common';
import { DITokenConstants } from 'src/common/constants/di-token-constants';
import { ParameterFileSharedRepository } from 'src/shared/parameter-file-shared/parameter-file-shared.repository';
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

  updateConfig(): Promise<GlobalConfig> {
    throw new Error('Method not implemented.');
  }
}
