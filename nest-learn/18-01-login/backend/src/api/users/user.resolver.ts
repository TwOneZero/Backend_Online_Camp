import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../common/auth/gql-user-param.decorator';
import { GqlAuthGuard } from 'src/common/auth/gql-auth.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //회원가입
  @Mutation(() => User)
  async signUp(@Args('createUserDto') createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => String)
  async fetchUser(@CurrentUser() curUser: any) {
    console.log('fetch user');
    console.log(`User 정보 : ${{ email: curUser.email, sub: curUser.sub }}`);

    return 'fetch users';
  }
}
