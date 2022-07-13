import { Module } from '@nestjs/common';
import { ConfigFileService } from './config-file.service';

@Module({
  providers: [ConfigFileService],
  exports: [ConfigFileService],
})
export class ConfigFileModule {}
