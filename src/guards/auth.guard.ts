import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const userId = request.session.userId;
    if (!userId) {
      throw new ForbiddenException('logged in user only');
    }

    return userId;
  }
}
