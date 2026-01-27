import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyToken } from '../auth/utils/verifyToken';
import { RequestWithUser } from '../auth/types/requestWithUser.interface';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = request.cookies['accessToken'] as string;

    if (!token) {
      throw new UnauthorizedException('missing_access_token');
    }
    try {
      const { payload } = await verifyToken(token, 'accessToken');

      request.user = {
        id: payload.sub,
        email: payload.email,
      };
      return true;
    } catch {
      throw new UnauthorizedException('invalid_access_token');
    }
  }
}
