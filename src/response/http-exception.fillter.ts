import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Response } from 'express';
import { CommonResponseDto } from './common-response.dto';

/**
 * 共通仕様どおりにレスポンスを変換するための独自ExceptionFilter
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse();

    // オリジナルの例外オブジェクトをログ出力
    if (status >= 400 && status < 500) {
      this.logger.warn(error);
    } else {
      this.logger.error(error);
    }

    response.status(status).json(new CommonResponseDto(status, null, error));
  }
}
