import { MiddlewareConsumer, Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { GlobalConfigModule } from './modules/global-config/global-config.module';
import { UsersModule } from './modules/users/users.module';
import { LogsMiddleware } from './middlewares/logs.middleware';

/**
 * アプリケーション本体
 */
@Module({
  imports: [
    // 環境変数モジュール
    ConfigModule.forRoot({ isGlobal: true }),

    // 静的ホスティングモジュール
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'docs/openapi'),
      serveRoot: '/openapi',
    }),

    // 各種APIモジュール
    GlobalConfigModule,
    UsersModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
