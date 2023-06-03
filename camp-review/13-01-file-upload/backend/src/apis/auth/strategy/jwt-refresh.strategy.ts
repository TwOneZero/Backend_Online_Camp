import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { IJwtPayload } from '../interfaces/auth-service.interfaces';
import { IContext } from 'src/commons/interfaces/context';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ({ req }: IContext) => {
        const cookie = req.headers.cookie;
        //쿠키가 여러개 일 때는 세미 콜론 기준으로 나눠서 찾아야 함
        const cookieString: string[] = cookie.split(';');
        let refreshToken: string;
        cookieString.forEach((el) => {
          if (el.includes('refreshToken')) {
            refreshToken = el.replace('refreshToken=', '');
            return;
          }
        });
        return refreshToken;
      },
      secretOrKey: config.get<string>('JWT_REFRESH_SECRET'),
    });
  }

  validate(payload: IJwtPayload) {
    return {
      id: payload.sub,
    };
  }
}
