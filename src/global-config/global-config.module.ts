import { Module } from '@nestjs/common';
import { ConfigFileModule } from 'src/config-file/config-file.module';
import { GlobalConfigService } from './global-config.service';
import { GlobalConfigController } from './global-config.controller';
import { GlobalConfigRepository } from './global-config.repository';

@Module({
  imports: [ConfigFileModule],
  controllers: [GlobalConfigController],
  providers: [GlobalConfigService, GlobalConfigRepository],
})
export class GlobalConfigModule {}
