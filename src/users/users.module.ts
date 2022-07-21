import { Module } from '@nestjs/common';
import { PrismaSharedModule } from 'src/shared-modules/prisma-shared/prisma-shared.module';
import { UsersController } from './users.controller';
import { UsersServiceImpl } from './users.service.impl';
import { USERS_SERVICE } from './interfaces/users.service';

@Module({
  imports: [PrismaSharedModule],
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
