import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

/**
 * Usersサービス
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * 単体登録処理
   *
   * @param createUserDto 登録データ
   * @returns 登録したUserを内包したPromiseオブジェクト
   * @throws DB更新失敗
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(createUserDto);
  }

  /**
   * 一括取得処理
   *
   * @returns User配列を内包したPromiseオブジェクト
   */
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  /**
   * 単体取得処理
   *
   * @param id ユーザID
   * @returns 指定したIDのUserを内包したPromiseオブジェクト
   * @throws NotFoundException 指定したIDのUserが存在しない
   */
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  /**
   * 単体更新処理
   *
   * @param id ユーザID
   * @param updateUserDto 更新データ
   * @returns 更新したUserを内包したPromiseオブジェクト
   * @throws NotFoundException 指定したIDのUserが存在しない
   * @throws DB更新失敗
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.save({ id, updateUserDto }); // TODO: 更新されない
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  /**
   * 単体削除処理
   * データの整合性をチェックする必要がない為deleteを使用
   *
   * @param id ユーザID
   * @throws DB更新失敗
   */
  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });
    await this.usersRepository.delete(user);
  }
}
