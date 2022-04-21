import { ExecutionContext, ForbiddenException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

export class MeGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest<TUser = any>(err: any, user: any, info: any, context: any, status?: any): TUser {
    const userId = context.switchToHttp().getRequest().params.userId;

    if (err || !user) throw err || new UnauthorizedException();

    if (!userId) throw new InternalServerErrorException('This endponint should contain "userId" param');

    if (userId !== user.id) throw new ForbiddenException('This content is for owner only');


    return user;
  }
}