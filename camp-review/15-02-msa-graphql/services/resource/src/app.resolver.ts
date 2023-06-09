// import { Controller, Get } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
// import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  // constructor(private readonly appService) {}

  @Query(() => String)
  fetchBoard() {
    return '게시글 data';
  }
}
