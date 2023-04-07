import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';
import dotenv = require('dotenv');
dotenv.config();

@Injectable()
export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    //strategy 인가가 성공하면 validate 함수로 넘어감
    super({
      //아이디 비밀번호
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK,
      scope: ['profile_nickname', 'account_email'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken, refreshToken, profile);
    return {
      email: profile._json.kakao_account.email,
      name: profile.username,
      password: profile.id,
      age: 0,
    };
  }
}
