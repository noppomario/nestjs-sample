import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { CommonResponseDto } from './common-response.dto';

/**
 * 共通仕様どおりにレスポンスボディを変換するためのInterceptor
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TransformInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((data: unknown) => this.transform(context, data)));
  }

  private transform(
    context: {
      getArgByIndex: (arg0: number) => {
        (): any;
        new (): any;
        statusCode: number;
      };
    },
    data: any,
  ) {
    const resBody = new CommonResponseDto(
      context.getArgByIndex(1).statusCode,
      data,
      null,
    );

    this.logger.log({ responseBody: resBody }, 'レスポンスボディ変換');

    return resBody;
  }
}
