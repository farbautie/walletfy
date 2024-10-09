import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GuardsService } from './guards.service';
import { ExceptionsService } from 'src/settings/exceptions';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { JWT_CONSTANS } from '../constans';

@Injectable()
export class AccessGuard extends AuthGuard('jwt') {
  constructor(
    private readonly guardService: GuardsService,
    private readonly exceptionService: ExceptionsService,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authorization = req.headers['authorization'];
    const token = authorization && authorization.split(' ')[1];
    if (!token) {
      this.exceptionService.unauthorizedException({
        message: 'No token provided',
        code: 401,
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_CONSTANS.ACCESS_SECRET,
      });

      const session = await this.guardService.validateAccess(token);

      req.session = {
        ...payload,
        sessionId: session.id,
      };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        this.exceptionService.forbiddenException({
          message: 'Access token expired',
          code: 403,
        });
      }
      this.exceptionService.forbiddenException({
        message: 'Invalid access token',
        code: 403,
      });
    }
    return true;
  }
}
