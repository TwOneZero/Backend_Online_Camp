/* eslint-disable prettier/prettier */
// app.controller.ts

import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(private readonly appService) {}

  @MessagePattern({ cmd: 'fetchBoards' })
  fetchBoards222() {
    // 데이터 조회
    return '게시글 데이터 보내주기';
  }
}
