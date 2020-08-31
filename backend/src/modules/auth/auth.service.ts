import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { User } from '../users/entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interfac';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null;
    }

    const compare = await user.comparePassowrd(password);
    if (!compare) {
      return null;
    }

    delete user.password;
    return user;
  }

  async login(user: any) {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
