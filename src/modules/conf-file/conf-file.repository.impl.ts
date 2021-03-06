import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { ConfFileRepository } from './conf-file.repository';

/**
 * 設定ファイルリポジトリの実装クラス
 */
@Injectable()
export class ConfFileRepositoryImpl implements ConfFileRepository {
  async parse(filePath: string): Promise<Map<string, string>> {
    const config = await readFile(filePath, 'utf8');
    if (!config) {
      throw InternalServerErrorException;
    }

    const confMap = new Map();
    config.split('\n').forEach((line) => {
      const [key, value] = line.split('=');
      if (key) {
        confMap.set(key, value);
      }
    });

    return confMap;
  }

  async update(
    filePath: string,
    paramsMap: Map<string, string>,
  ): Promise<Map<string, string>> {
    const confArray: Array<string> = [];
    paramsMap.forEach((value, key) => {
      confArray.push(`${key}=${value}`);
    });

    await writeFile(filePath, confArray.join('\n'), 'utf8');
    return paramsMap;
  }
}
