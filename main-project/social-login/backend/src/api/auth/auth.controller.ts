import { Controller, UseGuards, Get, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';

export interface IOAuthUser {
  user: Pick<User, 'email' | 'password' | 'name' | 'age'>;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('google'))
  @Get('/login/google')
  loginGoogle(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    return this.authService.oAuthLogin(req, res);
  }

  @UseGuards(AuthGuard('naver'))
  @Get('/login/naver')
  loginNaver(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    return this.authService.oAuthLogin(req, res);
  }

  @UseGuards(AuthGuard('kakao'))
  @Get('/login/kakao')
  loginKakao(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    return this.authService.oAuthLogin(req, res);
  }
}
