import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  // 在Dto中已经添加了匹配规则，ValidationPipe就会按照Dto中的匹配规则进行校验
  @Post('signup')
  signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('signin')
  signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialsDto) {
    return this.authService.signIn(authCredentialDto);
  }
}
