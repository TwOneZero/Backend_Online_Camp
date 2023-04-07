import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-naver';
import dotenv = require('dotenv');
dotenv.config();

@Injectable()
export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    //strategy 인가가 성공하면 validate 함수로 넘어감
    super({
      //아이디 비밀번호
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK,
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken, refreshToken, profile);
    return {
      email: profile.emails[0].value,
      name: profile.displayName,
      password: profile.id,
      age: 0,
    };
  }
}
