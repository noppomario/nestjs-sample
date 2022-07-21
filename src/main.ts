import {
  ClassSerializerInterceptor,
  ValidationPipe,
  ValidationPipeOptions,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception-fillters/http-exception.fillter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { UsersdbPrismaSharedService } from './shared-modules/prisma-shared/usersdb-prisma-shared.service';
import { LogsdbPrismaSharedService } from './shared-modules/prisma-shared/logsdb-prisma-shared.service';

/**
 * エントリポイント
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose', 'debug'],
  });

  const NODE_ENV = app.get(ConfigService).get('NODE_ENV');

  // Prisma用シャットダウン設定
  const usersdbPrismaService = app.get(UsersdbPrismaSharedService);
  await usersdbPrismaService.enableShutdownHooks(app);
  const logsdbPrismaService = app.get(LogsdbPrismaSharedService);
  await logsdbPrismaService.enableShutdownHooks(app);

  // ベースURL設定
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // 全URLで有効化するPipe
  // - リクエストのバリデーション
  const validOptions: ValidationPipeOptions = {
    whitelist: true, // 未定義パラメータを取り除く
  };
  app.useGlobalPipes(new ValidationPipe(validOptions));

  // 全URLで有効化するInterceptor
  // - Entityをレスポンス定義に合わせて修正(Serialization)
  // - 共通レスポンス化
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new TransformInterceptor(),
  );

  // 全URLで有効化するException Fillter
  // - 共通レスポンス化/組み込み例外の日本語化
  app.useGlobalFilters(new HttpExceptionFilter());

  // HTTPヘッダのセキュア化
  if (NODE_ENV === 'production') {
    app.use(helmet());
  }

  // サーバ起動
  const PORT = app.get(ConfigService).get('PORT');
  await app.listen(PORT);

  // API仕様書のパスを表示(development)
  if (NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(`API documentation: http://localhost:${PORT}/openapi/`);
  }
}
bootstrap();
