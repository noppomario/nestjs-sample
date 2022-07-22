import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersServiceImpl } from './users.service.impl';
import { USERS_SERVICE } from './interfaces/users.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    {
      provide: USERS_SERVICE,
      useClass: UsersServiceImpl,
    },
  ],
  exports: [USERS_SERVICE],
})
export class UsersModule {}
