import { Transform } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * usersレコード
 */
@Entity()
export class User {
  /**
   * ID
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * ユーザ名
   */
  @Column()
  name: string;

  /**
   * 年齢
   */
  @Column()
  age: number;

  /**
   * メールアドレス
   * - データは暗号化されてDBに保存されている
   * [APIレスポンス返却時の動作]
   * - 設定済かどうかを判断できるようマスク文字列を返す
   */
  @Column()
  @Transform(({ value }) => (value ? '********' : ''))
  email: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
