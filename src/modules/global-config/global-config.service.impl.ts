import { Inject, Injectable } from '@nestjs/common';
import { UpdateGlobalConfigDto } from './dto/update-global-config.dto';
import { GlobalConfig } from './entities/global-config.entity';
import {
  GlobalConfigRepository,
  GLOBAL_CONFIG_REPOSITORY,
} from './global-config.repository';
import { GlobalConfigService } from './global-config.service';

/**
 * グローバル設定サービスの実装クラス
 */
@Injectable()
export class GlobalConfigServiceImpl implements GlobalConfigService {
  constructor(
    @Inject(GLOBAL_CONFIG_REPOSITORY)
    private readonly globalConfigRepository: GlobalConfigRepository,
  ) {}

  async findConfig(): Promise<GlobalConfig> {
    return this.globalConfigRepository.findConfig();
  }

  async updateConfig(
    updateGlobalConfigDto: UpdateGlobalConfigDto,
  ): Promise<GlobalConfig> {
    return this.globalConfigRepository.updateConfig(updateGlobalConfigDto);
  }
}
