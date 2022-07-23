import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
// @internal内の事前に生成したclientを参照する
// eslint-disable-next-line import/no-extraneous-dependencies
import { Prisma, PrismaClient } from '@internal/prisma/client';

/**
 * Prismaクライアント(logs.db)
 */
@Injectable()
export class PrismaLogsdbService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit
{
  private readonly logger = new Logger(PrismaLogsdbService.name);

  constructor() {
    super({ log: ['query', 'info', 'warn', 'error'] });
  }

  async onModuleInit() {
    this.$on('query', (event) => {
      this.logger.log(`Query: ${event.query}`);
      this.logger.log(`Params: ${event.params}`);
      this.logger.log(`Duration: ${event.duration} ms`);
    });
    this.$on('info', (event) => {
      this.logger.log(`message: ${event.message}`);
    });
    this.$on('error', (event) => {
      this.logger.error(`error: ${event.message}`);
    });
    this.$on('warn', (event) => {
      this.logger.warn(`warn: ${event.message}`);
    });

    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
