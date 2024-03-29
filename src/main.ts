import {
  ClassSerializerInterceptor,
  ValidationPipe,
  ValidationPipeOptions,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { join } from 'path';
import { AppModule } from './app.module';
import { PrismaUsersdbService } from './modules/prisma/prisma-usersdb.service';
import { TransformInterceptor } from './response/transform.interceptor';
import { HttpExceptionFilter } from './response/http-exception.filter';
import { PrismaLogsdbService } from './modules/prisma/prisma-logsdb.service';

/**
 * エントリポイント
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // ログ設定
  app.useLogger(app.get(Logger));

  // Prisma用シャットダウン設定
  const usersdbPrismaService = app.get(PrismaUsersdbService);
  await usersdbPrismaService.enableShutdownHooks(app);
  const logsdbPrismaService = app.get(PrismaLogsdbService);
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
  // - エラーログの詳細表示
  // - Entityをレスポンス定義に合わせて修正(Serialization)
  // - 共通レスポンス化
  app.useGlobalInterceptors(
    new LoggerErrorInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
    new TransformInterceptor(),
  );

  // 全URLで有効化するException Filter
  // - 共通レスポンス化/組み込み例外の日本語化
  app.useGlobalFilters(new HttpExceptionFilter());

  // HTTPヘッダのセキュア化
  app.use(helmet());

  // OpenAPI設定
  const NODE_ENV = app.get(ConfigService).get('NODE_ENV');
  const PORT = app.get(ConfigService).get('PORT');
  if (NODE_ENV === 'development') {
    const yml: Record<string, any> = load(
      readFileSync(join(__dirname, 'docs/openapi-bundle.yaml'), 'utf8'),
    );
    const json: string = JSON.stringify(yml, null, 0);
    const document: OpenAPIObject = JSON.parse(json);
    SwaggerModule.setup('api', app, document);

    // eslint-disable-next-line no-console
    console.log(`API documentation: http://localhost:${PORT}/api/`);
  }

  // サーバ起動
  await app.listen(PORT);
}
bootstrap();
