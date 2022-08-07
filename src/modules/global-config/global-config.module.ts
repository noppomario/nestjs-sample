import { Module } from '@nestjs/common';
import { ConfFileModule } from '../conf-file/conf-file.module';
import { GlobalConfigController } from './global-config.controller';
import { GlobalConfigRepositoryImpl } from './global-config.repository.impl';
import { GlobalConfigServiceImpl } from './global-config.service.impl';
import { GLOBAL_CONFIG_REPOSITORY } from './global-config.repository';
import { GLOBAL_CONFIG_SERVICE } from './global-config.service';

/**
 * グローバル設定モジュール
 */
@Module({
  imports: [ConfFileModule],
  controllers: [GlobalConfigController],
  providers: [
    {
      provide: GLOBAL_CONFIG_SERVICE,
      useClass: GlobalConfigServiceImpl,
    },
    {
      provide: GLOBAL_CONFIG_REPOSITORY,
      useClass: GlobalConfigRepositoryImpl,
    },
  ],
})
export class GlobalConfigModule {}
