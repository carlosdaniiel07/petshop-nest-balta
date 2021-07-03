import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConstants from './jwt.constants';
import { JwtPayload } from '@modules/auth/models/jwt-payload.model';
import { UserRole } from '@modules/backoffice/enums/user-role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<{ id: string; role: UserRole }> {
    return {
      id: payload.sub,
      role: payload.role,
    };
  }
}
