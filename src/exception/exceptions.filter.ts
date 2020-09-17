import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger, HttpException } from "@nestjs/common";

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) : void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
 
    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).send({
        code: exception.message
      });
    } else {
      Logger.error(exception)
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        code: 'exception.internal'
      });
    }
  }
}