import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import { Module } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { GlobalConfigModule } from './modules/global-config/global-config.module';
import { UsersModule } from './modules/users/users.module';

/**
 * アプリケーション本体
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('production'),
        PORT: Joi.number(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'docs/openapi'),
      serveRoot: '/openapi',
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        genReqId: () => uuid(),
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: true,
          },
        },
      },
    }),
    GlobalConfigModule,
    UsersModule,
  ],
})
export class AppModule {}
