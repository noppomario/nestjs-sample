import { Module } from '@nestjs/common';
import { DITokenConstants } from 'src/common/constants/di-token-constants';
import { ParameterFileSharedRepositoryImpl } from './parameter-file-shared.repository.impl';

@Module({
  providers: [
    {
      provide: DITokenConstants.PARAMETER_FILE_SHARED_REPOSITORY,
      useClass: ParameterFileSharedRepositoryImpl,
    },
  ],
  exports: [
    {
      provide: DITokenConstants.PARAMETER_FILE_SHARED_REPOSITORY,
      useClass: ParameterFileSharedRepositoryImpl,
    },
  ],
})
export class ParameterFileSharedModule {}
