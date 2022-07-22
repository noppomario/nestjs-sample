import { Module } from '@nestjs/common';
import { CONF_FILE_REPOSITORY } from './conf-file.repository';
import { ConfFileRepositoryImpl } from './conf-file.repository.impl';

@Module({
  providers: [
    {
      provide: CONF_FILE_REPOSITORY,
      useClass: ConfFileRepositoryImpl,
    },
  ],
  exports: [
    {
      provide: CONF_FILE_REPOSITORY,
      useClass: ConfFileRepositoryImpl,
    },
  ],
})
export class ConfFileModule {}
