import { Controller, Post, Body, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  // 在Dto中已经添加了匹配规则，ValidationPipe就会按照Dto中的匹配规则进行校验
  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard('jwt'))
  test(@GetUser() user: User) {
    console.log('req', user);
  }

}
