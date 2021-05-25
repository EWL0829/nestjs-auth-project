import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { JwtStrategy } from './jwt.strategy';

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
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [
    JwtStrategy, // 在这里输出后其他模块也可以使用JwtStrategy来对用户鉴权
    PassportModule,
  ]
})
export class AuthModule {}
