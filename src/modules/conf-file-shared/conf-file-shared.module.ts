import { Module } from '@nestjs/common';
import { CONF_FILE_SHARED_REPOSITORY } from './conf-file-shared.repository';
import { ConfFileSharedRepositoryImpl } from './conf-file-shared.repository.impl';

@Module({
  providers: [
    {
      provide: CONF_FILE_SHARED_REPOSITORY,
      useClass: ConfFileSharedRepositoryImpl,
    },
  ],
  exports: [
    {
      provide: CONF_FILE_SHARED_REPOSITORY,
      useClass: ConfFileSharedRepositoryImpl,
    },
  ],
})
export class ConfFileSharedModule {}
