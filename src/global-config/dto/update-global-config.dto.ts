import { IsIP, IsOptional, ValidateIf } from 'class-validator';

export class UpdateGlobalConfigDto {
  /**
   * グローバルIPアドレス
   */
  @IsOptional()
  @ValidateIf((o, v) => v !== '')
  @IsIP(4, { message: 'グローバルIPアドレスのフォーマットが不正です。' })
  globalIpAddress: string;

  /**
   * プライベートIPアドレス
   */
  @IsOptional()
  @IsIP(4, { message: 'プライベートIPアドレスのフォーマットが不正です。' })
  privateIpAddress: string;
}
