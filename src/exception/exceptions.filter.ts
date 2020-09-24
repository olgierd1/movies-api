import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger} from "@nestjs/common";


interface Exception extends Error {
  getStatus();
  response: {
    message: string[]
  }
}
@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: Exception, host: ArgumentsHost) : void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus()
 
    if (status === 500) {
      Logger.error(exception)
    }
    
    response.status(exception.getStatus()).send({
      description: status === 400 ? exception?.response?.message : exception.message
    })
  }
}
