import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import dotenv = require('dotenv');
dotenv.config();

@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    //strategy 인가가 성공하면 validate 함수로 넘어감
    super({
      //아이디 비밀번호
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(accessToken, refreshToken, profile);
    return {
      email: profile.emails[0].value,
      name: profile.displayName,
      password: profile.id,
      age: 0,
    };
  }
}
