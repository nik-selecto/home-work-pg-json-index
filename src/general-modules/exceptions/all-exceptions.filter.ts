import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { FastifyReply } from 'fastify';


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    if (exception instanceof BadRequestException) {
      return httpAdapter.reply(ctx.getResponse<FastifyReply>(), exception.getResponse());
    }


    return httpAdapter.reply(
      ctx.getResponse(),
      { httpStatus: HttpStatus.INTERNAL_SERVER_ERROR },
      HttpStatus.INTERNAL_SERVER_ERROR
    );


  }

}
