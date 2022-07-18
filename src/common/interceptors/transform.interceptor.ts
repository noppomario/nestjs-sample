import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { CommonResponseDto } from '../dto/common-response.dto';

/**
 * 共通仕様どおりにレスポンスを変換するためのInterceptor
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map(
          (data: unknown) =>
            new CommonResponseDto(
              context.getArgByIndex(1).statusCode,
              data,
              null,
            ),
        ),
      );
  }
}
