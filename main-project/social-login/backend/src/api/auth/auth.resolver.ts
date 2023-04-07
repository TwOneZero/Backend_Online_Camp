import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { UserLoginInput } from './dto/user-login-input.dto';
import {
  UnprocessableEntityException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  GqlAuthGuard,
  GqlAuthRefreshGuard,
} from 'src/common/auth/gql-auth.guard';
import { CurrentUser } from 'src/common/auth/gql-user-param.decorator';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('userLoginInput') userLoginInput: UserLoginInput,
    @Context() context: any,
  ) {
    //1. find user
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

    //4. RefreshToken 생성 -> 쿠키
    this.authService.setRefreshToken({ user, res: context.req.res });

    //5. JWT 생성  -> 브라우저에 전달
    const payload = { email: user.email, sub: user.id };
    return this.authService.getAccessToken(payload);
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  async restoreAccessToken(@CurrentUser() curUser: any) {
    return this.authService.getAccessToken({ user: curUser }, 'refreshKey');
  }
}
