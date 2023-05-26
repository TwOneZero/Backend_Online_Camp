import { AppService } from './app.service';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  aaa(): string {
    return 'aaa';
  }

  @Mutation(() => String)
  login(): string {
    return 'login 성공';
  }
}
