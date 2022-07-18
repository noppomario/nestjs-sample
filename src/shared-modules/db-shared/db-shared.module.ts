import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Constants } from 'src/common/constants/constants';
import { User } from 'src/users/entities/user.entity';
import { Log } from 'src/logs/entities/logs.entity';
import { DbSharedLogger } from './db-shared-logger';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      name: Constants.DB_CONNECTION_USERS,
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        logger: new DbSharedLogger(),
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
        logger: new DbSharedLogger(),
        database: configService.get('DB_PATH_LOGS'),
        synchronize: true,
        entities: [Log],
      }),
    }),
  ],
})
export class DbSharedModule {}
