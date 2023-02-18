import {
  ExceptionFilter, Catch,
  ArgumentsHost, HttpException
} from '@nestjs/common';

import { FastifyReply } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost) {
    const response: FastifyReply<any> = host.switchToHttp().getResponse<FastifyReply>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error = typeof response === 'string'
      ? { message: exceptionResponse }
      : (exceptionResponse as object);

    let message = {};

    if(status == 400) {
      message = { error: "Cannot process, the format is incorrect" };
    } else if( status == 401 ) {
      message = { error: "Not authorized" };
    } else {
      message = { error: (error as any).message };
    }

    response
      .status(status)
      .send(message);
  }
}