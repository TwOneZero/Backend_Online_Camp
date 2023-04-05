import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserLoginInput } from './dto/user-login-input.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  login(@Args('userLoginInput') userLoginInput: UserLoginInput) {
    return this.authService.loginUser(userLoginInput);
  }
}
