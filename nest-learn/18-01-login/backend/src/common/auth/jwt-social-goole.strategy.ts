import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    //strategy 인가가 성공하면 validate 함수로 넘어감
    super({
      //아이디 비밀번호
      clientID:
        '289678496894-6qlt6gmcun0e919rrrh3qpbj5a3bd2t7.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/login/google',
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
