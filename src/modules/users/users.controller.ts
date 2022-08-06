import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { users } from '@prisma/client';
import { UpdateDtoFilter } from 'src/utils/update-dto-filter';
import { UsersService, USERS_SERVICE } from './interfaces/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * Usersコントローラ
 */
@Controller('users')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: UsersService,
  ) {}

  /**
   * 単体登録API
   *
   * @param createUserDto 登録データ
   * @returns 登録したUserを内包したPromiseオブジェクト
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<users> {
    return this.usersService.create(createUserDto);
  }

  /**
   * 一括取得API
   *
   * @returns User配列を内包したPromiseオブジェクト
   */
  @Get()
  findAll(): Promise<users[]> {
    return this.usersService.findAll();
  }

  /**
   * 単体取得API
   *
   * @param id ユーザID
   * @returns 指定したIDのUserを内包したPromiseオブジェクト
   */
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_FOUND }),
    )
    id: number,
  ): Promise<users> {
    return this.usersService.findOne(id);
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
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_FOUND }),
    )
    id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<users> {
    const dto: UpdateUserDto = UpdateDtoFilter.nullFilter(updateUserDto);
    return this.usersService.update(id, dto);
  }

  /**
   * 単体削除API
   *
   * @param id ユーザID
   * @returns レスポンスなし
   */
  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_FOUND }),
    )
    id: number,
  ): Promise<void> {
    return this.usersService.remove(id);
  }
}
