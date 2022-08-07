import { Test, TestingModule } from '@nestjs/testing';
import { GlobalConfigController } from './global-config.controller';
import { GlobalConfigServiceImpl } from './global-config.service.impl';

describe('GlobalConfigController', () => {
  let controller: GlobalConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalConfigController],
      providers: [GlobalConfigServiceImpl],
    }).compile();

    controller = module.get<GlobalConfigController>(GlobalConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
