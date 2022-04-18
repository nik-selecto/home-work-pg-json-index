import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { FastifyReply, FastifyRequest } from 'fastify';


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const responseBody = {
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest<FastifyRequest>()),
    };

    if (exception instanceof HttpException) {
      const httpStatus = exception.getStatus();
      httpAdapter.reply(ctx.getResponse<FastifyReply>(), { ...responseBody, httpStatus }, httpStatus);
    } else {
      /**
       * add code for no-http errors and only at the full end 500
       */
      httpAdapter.reply(
        ctx.getResponse(),
        { ...responseBody, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

  }

}
