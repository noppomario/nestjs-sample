import { ConfigModule, ConfigService } from '@nestjs/config';
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
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        pinoHttp: {
          customProps: () => ({
            context: 'HTTP',
          }),
          genReqId: () => uuid(),
          serializers: {
            req: (req) => {
              // リクエストボディをログ出力するが、特定のプロパティはマスクする
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
              destination:
                configService.get('NODE_ENV') === 'production'
                  ? configService.get('LOG_FILE_PATH')
                  : 1, // STDOUT
              sync: true,
              append: true,
              mkdir: true,
            },
          },
        },
      }),
    }),
    GlobalConfigModule,
    UsersModule,
  ],
})
export class AppModule {}
