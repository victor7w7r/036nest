import {
  ExceptionFilter, Catch,
  ArgumentsHost, NotFoundException
} from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(_exception: NotFoundException, host: ArgumentsHost) {

    const response = host.switchToHttp().getResponse();

    response
      .status(404)
      .send({"error" : "Not Found"});
  }
}