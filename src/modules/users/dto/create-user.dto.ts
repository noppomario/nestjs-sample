import {
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

/**
 * 単体登録リクエストの変換データオブジェクト
 */
export class CreateUserDto {
  /**
   * 名前
   * - 必須入力
   * - 1-20文字
   * - 半角英数字
   * - 数値のみは不可
   */
  @IsNotEmpty({ message: 'ユーザ名を入力してください。' })
  @Length(1, 20, {
    message:
      'ユーザ名は$constraint1文字以上$constraint2文字以内で入力してください。',
  })
  @Matches(/^[0-9a-zA-Z]*$/i, {
    message: 'ユーザ名は半角英数字で入力してください。',
  })
  name: string;

  /**
   * 年齢
   * - 必須入力
   * - 0-120の数値
   */
  @IsNotEmpty({ message: '年齢を入力してください。' })
  @Min(0, { message: '年齢は$constraint1以上の数値を入力してください。' })
  @Max(120, { message: '年齢は$constraint1以下の数値を入力してください。' })
  age: number;

  /**
   * メールアドレス
   * - 必須入力
   * - 空文字またはメールアドレス形式の文字列
   */
  @ValidateIf((o, v) => v !== '')
  @IsEmail({}, { message: 'メールアドレスのフォーマットが不正です。' })
  email: string;
}
