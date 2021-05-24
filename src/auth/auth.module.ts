import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'topSecret51', // 这是一个非常简单的密钥
      signOptions: {
        expiresIn: 3600, // expressed in seconds or a string describing a time span zeit/ms . Eg: 60, “2 days”, “10h”, “7d”
      },
    }),
    TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
