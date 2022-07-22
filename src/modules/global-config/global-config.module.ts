import { Module } from '@nestjs/common';
import { ConfFileSharedModule } from '../conf-file-shared/conf-file-shared.module';
import { GlobalConfigController } from './global-config.controller';
import { GlobalConfigRepositoryImpl } from './global-config.repository.impl';
import { GlobalConfigServiceImpl } from './global-config.service.impl';
import { GLOBAL_CONFIG_REPOSITORY } from './interfaces/global-config.repository';
import { GLOBAL_CONFIG_SERVICE } from './interfaces/global-config.service';

@Module({
  imports: [ConfFileSharedModule],
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
