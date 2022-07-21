import { Module } from '@nestjs/common';
import { LogsdbPrismaSharedService } from './logsdb-prisma-shared.service';
import { UsersdbPrismaSharedService } from './usersdb-prisma-shared.service';

/**
 * Prisma共有モジュール
 */
@Module({
  providers: [LogsdbPrismaSharedService, UsersdbPrismaSharedService],
  exports: [LogsdbPrismaSharedService, UsersdbPrismaSharedService],
})
export class PrismaSharedModule {}
