import { Test, TestingModule } from '@nestjs/testing';
import { DriverServiceController } from './driver-service.controller';
import { DriverServiceService } from './driver-service.service';

describe('DriverServiceController', () => {
  let driverServiceController: DriverServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DriverServiceController],
      providers: [DriverServiceService],
    }).compile();

    driverServiceController = app.get<DriverServiceController>(DriverServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(driverServiceController.getHello()).toBe('Hello World!');
    });
  });
});
