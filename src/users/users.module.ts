import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Constants } from 'src/common/constants/constants';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UsersServiceImpl } from './users.service.impl';
import { USERS_SERVICE } from './interfaces/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User], Constants.DB_CONNECTION_USERS)],
  controllers: [UsersController],
  providers: [
    {
      provide: USERS_SERVICE,
      useClass: UsersServiceImpl,
    },
  ],
})
export class UsersModule {}
