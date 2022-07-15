import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { DITokenConstants } from 'src/common/constants/di-token-constants';
import { UsersService } from './interfaces/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

/**
 * Usersコントローラ
 */
@Controller('users')
export class UsersController {
  constructor(
    @Inject(DITokenConstants.USERS_SERVICE)
    private readonly usersService: UsersService,
  ) {}

  /**
   * 単体登録API
   *
   * @param createUserDto 登録データ
   * @returns 登録したUserを内包したPromiseオブジェクト
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  /**
   * 一括取得API
   *
   * @returns User配列を内包したPromiseオブジェクト
   */
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  /**
   * 単体取得API
   *
   * @param id ユーザID
   * @returns 指定したIDのUserを内包したPromiseオブジェクト
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  /**
   * 単体更新API
   *
   * @param id ユーザID
   * @param updateUserDto 更新データ
   * @returns 更新したUserを内包したPromiseオブジェクト
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(+id, updateUserDto);
  }

  /**
   * 単体削除API
   *
   * @param id ユーザID
   * @returns レスポンスなし
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}
