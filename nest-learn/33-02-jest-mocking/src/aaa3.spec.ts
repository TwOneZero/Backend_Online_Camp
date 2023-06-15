import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('Hello World! 를 리턴해야함', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  //   describe('fetchboard test', () => {});
  //   describe('createboard test', () => {});
});
