import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DITokenConstants } from 'src/common/constants/di-token-constants';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UsersServiceImpl } from './users.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    {
      provide: DITokenConstants.USERS_SERVICE,
      useClass: UsersServiceImpl,
    },
  ],
})
export class UsersModule {}
