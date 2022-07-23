import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import { v4 as uuid } from 'uuid';
import { Module } from '@nestjs/common';
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
        customProps: () => ({
          context: 'HTTP',
        }),
        genReqId: () => uuid(),
        serializers: {
          req: (req) => {
            req.body = req.raw.body;
            if (req.body.password) req.body.password = '*******';
            if (req.body.email) req.body.email = '*******';
            return req;
          },
        },
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            translateTime: 'SYS:standard',
            messageFormat:
              '[{req.id}] [{context}] {req.method} {req.url} {msg}',
          },
        },
      },
    }),
    GlobalConfigModule,
    UsersModule,
  ],
})
export class AppModule {}
