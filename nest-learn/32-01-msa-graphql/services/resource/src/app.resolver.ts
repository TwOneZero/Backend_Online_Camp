import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  fetchBoards() {
    return 'fetchBoards에서 데이터 보내기 성공!!';
  }
}
