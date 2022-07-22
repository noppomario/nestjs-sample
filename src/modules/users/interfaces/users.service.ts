import { users } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

/**
 * DI用トークン
 */
export const USERS_SERVICE = Symbol('di-token');

/**
 * Usersサービスのインターフェース
 */
export interface UsersService {
  /**
   * 単体登録処理
   *
   * @param createUserDto 登録データ
   * @returns 登録したUserを内包したPromiseオブジェクト
   * @throws DB更新失敗
   */
  create(createUserDto: CreateUserDto): Promise<users>;

  /**
   * 一括取得処理
   *
   * @returns User配列を内包したPromiseオブジェクト
   */
  findAll(): Promise<users[]>;

  /**
   * 単体取得処理
   *
   * @param id ユーザID
   * @returns 指定したIDのUserを内包したPromiseオブジェクト
   * @throws NotFoundException 指定したIDのUserが存在しない
   */
  findOne(id: number): Promise<users>;

  /**
   * 単体更新処理
   *
   * @param id ユーザID
   * @param updateUserDto 更新データ
   * @returns 更新したUserを内包したPromiseオブジェクト
   * @throws NotFoundException 指定したIDのUserが存在しない
   * @throws DB更新失敗
   */
  update(id: number, updateUserDto: UpdateUserDto): Promise<users>;

  /**
   * 単体削除処理
   * データの整合性をチェックする必要がない為deleteを使用
   *
   * @param id ユーザID
   * @throws DB更新失敗
   */
  remove(id: number): Promise<void>;
}
