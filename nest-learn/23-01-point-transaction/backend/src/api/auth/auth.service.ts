import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';

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
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken};, paht=/;`); //path 설정필요 (소셜로그인에서)

    //배포 시에 response 헤더 세팅
    /**
     * res.setHeader('Acces-Control-Allow-Origin', 여기는 브라우저 주소)
     * res.setHeader(
     *  'Set-Cookie',
     *  `refreshToken=${refreshToken}; paht=/; domain=여기는 백엔드 주소; SameSite=None; Secure; httpOnly;`
     * )
     */
  }
}
