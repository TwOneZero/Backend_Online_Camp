import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { IOAuthUser } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  getAccessToken(payload, secretKey = 'secret', expires = '1h') {
    return this.jwtService.sign(payload, {
      secret: secretKey,
      expiresIn: expires,
    });
  }
  setRefreshToken({ user, res }) {
    const refreshToken = this.getAccessToken(
      {
        email: user.email,
        sub: user.id,
      },
      'refreshKey',
      '2w',
    );
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken};, path=/;`); //path 설정필요 (소셜로그인에서)

    //배포 시에 response 헤더 세팅
    /**
     * res.setHeader('Acces-Control-Allow-Origin', 여기는 브라우저 주소)
     * res.setHeader(
     *  'Set-Cookie',
     *  `refreshToken=${refreshToken}; paht=/; domain=여기는 백엔드 주소; SameSite=None; Secure; httpOnly;`
     * )
     */
  }

  async oAuthLogin(req: Request & IOAuthUser, res: Response) {
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
    this.setRefreshToken({ user, res });
    //리다이렉트
    return res.redirect(
      'http://localhost:5500/main-project/social-login/frontend/socialLogin.html',
    );
  }
}
