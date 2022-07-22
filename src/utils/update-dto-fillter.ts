import { BadRequestException } from '@nestjs/common';

/**
 * 更新オブジェクトフィルター
 */
export class UpdateDtoFillter {
  /**
   * 引数で渡されたDTOから値がnullのプロパティを除去する
   *
   * PartialTypeを継承した更新系DTOは、値がnullのプロパティを素通しする為、
   * バリデーションロジックとは別に除去する必要がある。
   *
   * @param updateDto 更新データ
   * @returns 値がnullのプロパティを除去したObject
   */
  static nullFillter<T>(updateDto: T): { [k: string]: any } {
    const dto = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(updateDto).filter(([_, v]) => v != null),
    );

    // 除去した結果空になった場合は汎用の400エラーを返す
    if (!Object.keys(dto).length) {
      throw new BadRequestException();
    }
    return dto;
  }
}
