import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_CONSTANS } from '../constans';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefeshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANS.REFRESH_SECRET,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
