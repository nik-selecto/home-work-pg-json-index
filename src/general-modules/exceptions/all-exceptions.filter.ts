import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, ForbiddenException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { FastifyReply } from 'fastify';


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    console.error(exception);

    if (exception instanceof BadRequestException) {
      return httpAdapter.reply(ctx.getResponse<FastifyReply>(), exception.getResponse());
    } else if (exception instanceof ForbiddenException) {
      return httpAdapter.reply(ctx.getResponse(), exception.getResponse());
    } else if (exception instanceof UnauthorizedException) {
      return httpAdapter.reply(ctx.getResponse(), exception.getResponse());
    }


    return httpAdapter.reply(
      ctx.getResponse(),
      { httpStatus: HttpStatus.INTERNAL_SERVER_ERROR },
      HttpStatus.INTERNAL_SERVER_ERROR
    );


  }

}
