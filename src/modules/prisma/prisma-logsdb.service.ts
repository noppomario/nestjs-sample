import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
// 事前に生成した@internal内のclientを参照する
// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from '@internal/prisma/client';

/**
 * Prismaクライアント(logs.db)
 */
@Injectable()
export class PrismaLogsdbService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
