import { Inject, Injectable } from '@nestjs/common';
import { DITokenConstants } from 'src/common/constants/di-token-constants';
import { UpdateGlobalConfigDto } from './dto/update-global-config.dto';
import { GlobalConfig } from './entities/global-config.entity';
import { GlobalConfigRepository } from './interfaces/global-config.repository';
import { GlobalConfigService } from './interfaces/global-config.service';

/**
 * グローバル設定サービスの実装クラス
 */
@Injectable()
export class GlobalConfigServiceImpl implements GlobalConfigService {
  constructor(
    @Inject(DITokenConstants.GLOBAL_CONFIG_REPOSITORY)
    private readonly globalConfigRepository: GlobalConfigRepository,
  ) {}

  async findConfig(): Promise<GlobalConfig> {
    return this.globalConfigRepository.findConfig();
  }

  // TODO
  updateConfig(
    updateGlobalConfigDto: UpdateGlobalConfigDto,
  ): Promise<GlobalConfig> {
    // 設定更新
    // 更新した設定どおりに設定変更
    // 更新済設定を返す
    throw new Error('Method not implemented.');
  }
}
