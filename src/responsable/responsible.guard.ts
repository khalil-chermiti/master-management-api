import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResponsilbeJwt } from './responsible.jwt';

@Injectable()
export class ResponsibleAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log(token);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = (await this.jwtService.verifyAsync(
        token,
      )) as ResponsilbeJwt;
      request['responsibleId'] = payload.id;
      
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const bearerToken =
      request.headers['authorization'] || request.headers['Authorization'];

    console.log(bearerToken);

    if (typeof bearerToken === 'string') {
      const [type, token] = bearerToken.split(' ');
      return type === 'Bearer' ? token : undefined;
    }
  }
}
