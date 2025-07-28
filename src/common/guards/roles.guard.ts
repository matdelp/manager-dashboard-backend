import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from 'src/challenge/types/JwtPayload';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header missing or malformed',
      );
    }

    const token = authHeader.split(' ')[1];
    console.log(token);

    try {
      const decryptedToken =
        await this.jwtService.verifyAsync<JwtPayload>(token);
      console.log(decryptedToken);

      if (
        !decryptedToken ||
        typeof decryptedToken !== 'object' ||
        typeof decryptedToken.role !== 'string' ||
        typeof decryptedToken.id !== 'string'
      ) {
        throw new UnauthorizedException('Malformed token payload');
      }

      if (decryptedToken.role !== 'manager') {
        throw new ForbiddenException('Access denied: user is not a manager');
      }

      return true;
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Token verification failed');
    }
  }
}
