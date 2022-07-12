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
   */
  @Column()
  email: string;
}
