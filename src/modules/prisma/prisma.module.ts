import { Module } from '@nestjs/common';
import { PrismaLogsdbService } from './prisma-logsdb.service';
import { PrismaUsersdbService } from './prisma-usersdb.service';

/**
 * Prisma共有モジュール
 */
@Module({
  providers: [PrismaLogsdbService, PrismaUsersdbService],
  exports: [PrismaLogsdbService, PrismaUsersdbService],
})
export class PrismaModule {}
