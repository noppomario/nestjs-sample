import { Module } from '@nestjs/common';
import { ParameterFileSharedModule } from 'src/shared/parameter-file-shared/parameter-file-shared.module';
import { GlobalConfigService } from './global-config.service';
import { GlobalConfigController } from './global-config.controller';
import { GlobalConfigRepository } from './global-config.repository';

@Module({
  imports: [ParameterFileSharedModule],
  controllers: [GlobalConfigController],
  providers: [GlobalConfigService, GlobalConfigRepository],
})
export class GlobalConfigModule {}
