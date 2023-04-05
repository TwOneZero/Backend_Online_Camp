import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;

    console.log('=====Error=====');
    console.log('에러 내용 : ', message);
    console.log('에러 코드 :', status);
    console.log('===============');
    const res = exception.getResponse();
    console.log(res);
  }
}
