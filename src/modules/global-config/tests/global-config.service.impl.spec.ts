import { Test, TestingModule } from '@nestjs/testing';
import { GlobalConfigServiceImpl } from '../global-config.service.impl';

describe('GlobalConfigService', () => {
  let service: GlobalConfigServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalConfigServiceImpl],
    }).compile();

    service = module.get<GlobalConfigServiceImpl>(GlobalConfigServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
