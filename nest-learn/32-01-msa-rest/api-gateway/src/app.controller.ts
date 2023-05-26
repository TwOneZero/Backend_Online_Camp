import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly clientAuthService: ClientProxy,
    @Inject('RESOURCE_SERVICE')
    private readonly clientResourceService: ClientProxy,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('/auth/login')
  login() {
    return this.clientAuthService.send({ cmd: 'login' }, { name: '철수' });
  }

  @Get('/board')
  fetchBoard() {
    return this.clientResourceService.send(
      { cmd: 'fetchBoard' },
      { name: 'board-1' },
    );
  }
}
