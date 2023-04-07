import { Controller, UseGuards, Get, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: Pick<User, 'email' | 'password' | 'name' | 'age'>;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('google'))
  @Get('/login/google')
  async loginGoogle(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    console.log('google login api');

    // 1. 가입 확인
    let user = await this.userService.findOne(req.user.email);
    //2. 가입 안돼있다 -> 회원가입
    if (!user) {
      user = await this.userService.createUser({
        email: req.user.email,
        password: req.user.password,
        name: req.user.name,
        age: req.user.age,
      });
    }
    //3. 로그인
    this.authService.setRefreshToken({ user, res });
    //리다이렉트
    res.redirect(
      'http://localhost:5500/nest-learn/18-01-login/frontend/socialLogin.html',
    );

    //Oauth 구글 로그인
  }
}
