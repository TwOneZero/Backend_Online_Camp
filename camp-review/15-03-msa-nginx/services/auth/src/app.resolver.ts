import { Controller, Get } from '@nestjs/common';
import { Resolver, Mutation, Query } from '@nestjs/graphql';
// import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  // constructor(private readonly appService) {}

  @Mutation(() => String)
  login() {
    return 'accessToken!!!';
  }

  @Query(() => String)
  aaa() {
    return 'aaa';
  }
}
