import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { authJwt } from './jwtInterface';

@Injectable()
export class isAdmin implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user as authJwt;
    return user.role === 'AMDIN' ? true : false;
  }
}
