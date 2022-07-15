import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import envConfig from './common/config/env-configuration';
import { User } from './users/entities/user.entity';
import { GlobalConfigModule } from './global-config/global-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [envConfig] }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'docs/openapi'),
      serveRoot: '/openapi',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        // name: 'usersdb', # TODO: 複数DB指定で接続できなくなる
        type: 'sqlite',
        database: configService.get('DB_PATH_USERS'),
        synchronize: true,
        entities: [User],
      }),
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRoot({
    //   name: 'logsdb',
    //   type: 'sqlite',
    //   database: 'db/logs.db',
    //   synchronize: true,
    //   entities: [User],
    // }),
    GlobalConfigModule,
    UsersModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
