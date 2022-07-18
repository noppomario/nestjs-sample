import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constants } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './interfaces/users.service';

/**
 * Usersサービスの実装クラス
 */
@Injectable()
export class UsersServiceImpl implements UsersService {
  constructor(
    @InjectRepository(User, Constants.DB_CONNECTION_USERS)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('ユーザが見つかりません。', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update({ id }, updateUserDto);
    const updatedUser = await this.usersRepository.findOneBy({ id });
    if (!updatedUser) {
      throw new HttpException('ユーザが見つかりません。', HttpStatus.NOT_FOUND);
    }
    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    const deleteResponse = await this.usersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('ユーザが見つかりません。', HttpStatus.NOT_FOUND);
    }
  }
}
