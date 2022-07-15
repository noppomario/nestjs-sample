import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
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
    TypeOrmModule.forRoot({
      // name: 'usersdb', # TODO: 複数DB指定で接続できなくなる
      type: 'sqlite',
      database: 'db/users.db',
      synchronize: true,
      entities: [User],
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
