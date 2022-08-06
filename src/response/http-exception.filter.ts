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
 * 共通仕様どおりにレスポンスボディを変換するためのExceptionFilter
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse();
    const resBody = new CommonResponseDto(status, null, error);

    this.logger.error(
      { responseBody: resBody },
      'レスポンスボディ変換(エラー)',
    );

    response.status(status).json(resBody);
  }
}
