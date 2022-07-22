import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 * 単体更新リクエストの変換データオブジェクト
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
