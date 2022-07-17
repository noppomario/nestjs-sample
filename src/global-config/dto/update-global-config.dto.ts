import { IsIP, IsOptional } from 'class-validator';

export class UpdateGlobalConfigDto {
  /**
   * グローバルIPアドレス
   */
  @IsOptional()
  @IsIP(4)
  globalIpAddress: string;

  /**
   * プライベートIPアドレス
   */
  @IsOptional()
  @IsIP(4)
  privateIpAddress: string;
}
