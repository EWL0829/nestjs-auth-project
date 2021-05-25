import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<User> {
    const { username } = payload;
    const user = this.userRepository.findOne({ username });

    if (!user) {
      // 利用用户名查不到用户
      throw new UnauthorizedException('user doesn\'t exist');
    } else {
      return user;
    }
  }
}
