import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appService: AppService;
  let appController: AppController;
  beforeEach(() => {
    appService = new AppService();
    appController = new AppController(appService);
  });

  describe('getHello', () => {
    it('Hello World! 를 리턴해야함', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  //   describe('fetchboard test', () => {});
  //   describe('createboard test', () => {});
});
