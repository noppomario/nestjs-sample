import { NotFoundException } from '@nestjs/common';

/**
 * ユーザ用404エラー例外
 */
export class UserNotFoundException extends NotFoundException {
  constructor(userId: number) {
    super(`ID:${userId}のユーザが見つかりません。`);
  }
}
