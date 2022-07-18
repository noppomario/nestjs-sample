import { Module } from '@nestjs/common';
import { DITokenConstants } from 'src/common/constants/di-token-constants';
import { ConfFileSharedRepositoryImpl } from './conf-file-shared.repository.impl';

@Module({
  providers: [
    {
      provide: DITokenConstants.PARAMETER_FILE_SHARED_REPOSITORY,
      useClass: ConfFileSharedRepositoryImpl,
    },
  ],
  exports: [
    {
      provide: DITokenConstants.PARAMETER_FILE_SHARED_REPOSITORY,
      useClass: ConfFileSharedRepositoryImpl,
    },
  ],
})
export class ConfFileSharedModule {}
