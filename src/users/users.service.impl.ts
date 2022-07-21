import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { users } from '@prisma/client';
import { UsersdbPrismaSharedService } from 'src/shared-modules/prisma-shared/usersdb-prisma-shared.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './interfaces/users.service';

/**
 * Usersサービスの実装クラス
 */
@Injectable()
export class UsersServiceImpl implements UsersService {
  private readonly logger = new Logger(UsersServiceImpl.name);

  constructor(private prisma: UsersdbPrismaSharedService) {}

  async create(createUserDto: CreateUserDto): Promise<users> {
    return this.prisma.users.create({ data: createUserDto });
  }

  async findAll(): Promise<users[]> {
    return this.prisma.users.findMany();
  }

  async findOne(id: number): Promise<users> {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });
    if (!user) {
      this.logger.warn('Tried to access a user that does not exist');
      throw new NotFoundException();
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<users> {
    return this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.users.delete({ where: { id } });
  }
}
