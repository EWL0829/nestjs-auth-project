import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialDto);
  }

  async signIn(authCredentialDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const username = await this.userRepository.signIn(authCredentialDto);

    if (!username) {
      throw new UnauthorizedException('user doesn\'t exist');
    }
    const payload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
