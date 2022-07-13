import { Injectable } from '@nestjs/common';
import { UpdateGlobalConfigDto } from './dto/update-global-config.dto';
import { GlobalConfig } from './entities/global-config.entity';
import { GlobalConfigRepository } from './global-config.repository';

@Injectable()
export class GlobalConfigService {
  constructor(
    private readonly globalConfigRepository: GlobalConfigRepository,
  ) {}

  /**
   * グローバル設定の取得処理
   *
   * @returns
   */
  async findConfig(): Promise<GlobalConfig> {
    return this.globalConfigRepository.findConfig();
  }

  /**
   * グローバル設定の更新処理
   *
   * @param updateGlobalConfigDto 更新データ
   * @returns
   */
  updateConfig(updateGlobalConfigDto: UpdateGlobalConfigDto) {
    // 設定更新

    // 更新した設定どおりに設定変更

    // 更新済設定を返す
    return `This action updates a globalConfig`;
  }
}
