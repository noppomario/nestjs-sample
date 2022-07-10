import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  const PORT = app.get(ConfigService).get('PORT');
  await app.listen(PORT);
  const NODE_ENV = app.get(ConfigService).get('NODE_ENV');
  if (NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(`API documentation: http://localhost:${PORT}/`);
  }
}
bootstrap();
