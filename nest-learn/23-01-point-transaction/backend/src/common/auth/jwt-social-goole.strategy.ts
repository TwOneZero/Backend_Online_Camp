import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config();

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

  validate(accessToken, _, profile) {
    console.log(accessToken, profile);
    return {
      email: profile.emails[0].value,
      name: profile.displayName,
      password: '19274714723',
      age: 0,
    };
  }
}
