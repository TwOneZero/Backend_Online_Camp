import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    //strategy 인가가 성공하면 validate 함수로 넘어감
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        // const refreshToken = cookie.replace('refreshToken=', '');
        // return refreshToken;
        //쿠키가 여러개 일 때는 세미 콜론 기준으로 나눠서 찾아야 함
        const cookieString: string[] = cookie.split(';');
        let refreshToken;
        cookieString.forEach((el) => {
          if (el.includes('refreshToken')) {
            refreshToken = el.replace('refreshToken=', '');
          }
        });
        console.log(refreshToken);
        return refreshToken;
      },
      secretOrKey: 'refreshKey',
    });
  }

  validate(payload) {
    console.log(payload);
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
