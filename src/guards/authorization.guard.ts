import { authJwt } from './jwtInterface';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class isAdmin implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user as authJwt;
    return user.role === 'AMDIN' ? true : false;
  }
}

@Injectable()
export class isCandidate implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user as authJwt;
    return user.role === 'CANDIDATE' ? true : false;
  }
}
