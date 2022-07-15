import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { ParameterFileSharedRepository } from './parameter-file-shared.repository';

/**
 * 設定ファイルを扱うリポジトリの共通処理の実装クラス
 */
@Injectable()
export class ParameterFileSharedRepositoryImpl
  implements ParameterFileSharedRepository
{
  async parse(filePath: string): Promise<Map<string, string>> {
    const config = await readFile(filePath, 'utf8');
    if (!config) {
      throw InternalServerErrorException;
    }

    const confMap = new Map();
    config.split('\n').forEach((line) => {
      const [key, value] = line.split('=');
      confMap.set(key, value);
    });

    return confMap;
  }
}
