import { Module } from '@nestjs/common';
import { ParameterFileSharedRepository } from './parameter-file-shared.repository';

@Module({
  providers: [ParameterFileSharedRepository],
  exports: [ParameterFileSharedRepository],
})
export class ParameterFileSharedModule {}
