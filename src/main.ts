import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const NODE_ENV = app.get(ConfigService).get('NODE_ENV');

  // ベースURL設定
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // 全URLでバリデーション有効化
  app.useGlobalPipes(new ValidationPipe());

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
