import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { UserLoginInput } from './dto/user-login-input.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(userLoginInput: UserLoginInput) {
    //1. 이메일로 유저 찾기
    const user = await this.userService.findOne(userLoginInput.email);

    //2. 없으면 -> Error
    if (!user) {
      throw new UnprocessableEntityException('유저가 존재하지 않음');
    }

    //3. 있는데 비번 틀림  -> Error
    const isAuth = await bcrypt.compare(userLoginInput.password, user.password);
    if (!isAuth) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
    //4. JWT 생성  -> 브라우저에 전달
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload, {
      secret: 'secret',
    });
  }
}
