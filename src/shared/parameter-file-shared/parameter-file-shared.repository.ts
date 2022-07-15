import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { readFile } from 'fs/promises';

@Injectable()
export class ParameterFileSharedRepository {
  /**
   * 設定ファイルをパースしてkey/valueのMapを返す
   *
   * @param filePath 設定ファイルのパス
   * @returns 設定Map
   */
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
