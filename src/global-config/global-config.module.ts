import { Module } from '@nestjs/common';
import { DITokenConstants } from 'src/common/constants/di-token-constants';
import { ConfFileSharedModule } from 'src/shared-modules/conf-file-shared/conf-file-shared.module';
import { GlobalConfigController } from './global-config.controller';
import { GlobalConfigRepositoryImpl } from './global-config.repository.impl';
import { GlobalConfigServiceImpl } from './global-config.service.impl';

@Module({
  imports: [ConfFileSharedModule],
  controllers: [GlobalConfigController],
  providers: [
    {
      provide: DITokenConstants.GLOBAL_CONFIG_SERVICE,
      useClass: GlobalConfigServiceImpl,
    },
    {
      provide: DITokenConstants.GLOBAL_CONFIG_REPOSITORY,
      useClass: GlobalConfigRepositoryImpl,
    },
  ],
})
export class GlobalConfigModule {}
