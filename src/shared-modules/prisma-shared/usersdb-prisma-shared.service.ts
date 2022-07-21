import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Prismaクライアント(users.db)
 */
@Injectable()
export class UsersdbPrismaSharedService
  extends PrismaClient
  implements OnModuleInit
{
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
