import { MiddlewareConsumer, Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import envConfig from './common/config/env-configuration';
import { GlobalConfigModule } from './global-config/global-config.module';
import { LogsModule } from './logs/logs.module';
import { LogsMiddleware } from './common/middlewares/logs.middleware';
import { DbSharedModule } from './shared-modules/db-shared/db-shared.module';

@Module({
  imports: [
    // 環境変数モジュール
    ConfigModule.forRoot({ isGlobal: true, load: [envConfig] }),

    // 静的ホスティングモジュール
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'docs/openapi'),
      serveRoot: '/openapi',
    }),

    // DB接続モジュール
    DbSharedModule,

    // 各種APIモジュール
    GlobalConfigModule,
    LogsModule,
    UsersModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
