import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { JwtPayload } from './interfaces/jwt-payload.interfac';
import { UserService } from '../users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    // console.log(payload);
    // const user = await this.userService.findByEmail(payload.email)
    // if (!user) {
    //   done(new UnauthorizedException(), false);
    // }

    return { id: payload.id, email: payload.email };
  }
}
