import { Controller, Get, Body, Patch, Inject } from '@nestjs/common';
import {
  GlobalConfigService,
  GLOBAL_CONFIG_SERVICE,
} from './interfaces/global-config.service';
import { UpdateGlobalConfigDto } from './dto/update-global-config.dto';
import { GlobalConfig } from './entities/global-config.entity';

/**
 * グローバル設定コントローラ
 */
@Controller('global-config')
export class GlobalConfigController {
  /**
   * コンストラクタ
   *
   * @param globalConfigService グローバル設定サービスインターフェース
   */
  constructor(
    @Inject(GLOBAL_CONFIG_SERVICE)
    private readonly globalConfigService: GlobalConfigService,
  ) {}

  /**
   * 単体取得API
   *
   * @returns グローバル設定
   */
  @Get()
  findOne(): Promise<GlobalConfig> {
    return this.globalConfigService.findConfig();
  }

  /**
   * 単体更新API
   *
   * @param updateGlobalConfigDto 更新データ
   * @returns グローバル設定
   */
  @Patch()
  update(
    @Body() updateGlobalConfigDto: UpdateGlobalConfigDto,
  ): Promise<GlobalConfig> {
    return this.globalConfigService.updateConfig(updateGlobalConfigDto);
  }
}
