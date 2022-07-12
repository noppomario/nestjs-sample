import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

/**
 * 単体登録リクエストの変換データオブジェクト
 */
export class CreateUserDto {
  /**
   * 名前
   */
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * 年齢
   */
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(120)
  age: number;

  /**
   * メールアドレス
   */
  @IsEmail()
  email: string;
}
