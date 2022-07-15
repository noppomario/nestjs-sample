import { Module } from '@nestjs/common';
import { DITokenConstants } from 'src/common/constants/di-token-constants';
import { ParameterFileSharedModule } from 'src/shared-modules/parameter-file-shared/parameter-file-shared.module';
import { GlobalConfigController } from './global-config.controller';
import { GlobalConfigRepositoryImpl } from './global-config.repository.impl';
import { GlobalConfigServiceImpl } from './global-config.service.impl';

@Module({
  imports: [ParameterFileSharedModule],
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
