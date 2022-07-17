import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import envConfig from './common/config/env-configuration';
import { User } from './users/entities/user.entity';
import { GlobalConfigModule } from './global-config/global-config.module';
import { Log } from './logs/entities/logs.entity';
import { Constants } from './common/constants/constants';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [
    // 環境変数モジュール
    ConfigModule.forRoot({ isGlobal: true, load: [envConfig] }),

    // DB接続モジュール
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      name: Constants.DB_CONNECTION_USERS,
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get('DB_PATH_USERS'),
        synchronize: true,
        entities: [User],
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      name: Constants.DB_CONNECTION_LOGS,
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get('DB_PATH_LOGS'),
        synchronize: true,
        entities: [Log],
      }),
    }),

    // 静的ホスティングモジュール
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'docs/openapi'),
      serveRoot: '/openapi',
    }),

    // 各種APIモジュール
    GlobalConfigModule,
    LogsModule,
    UsersModule,
  ],
})
export class AppModule {}
