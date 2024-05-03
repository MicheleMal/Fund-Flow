import { Test, TestingModule } from '@nestjs/testing';
import { EarningSourcesController } from './earning-sources.controller';

describe('EarningSourcesController', () => {
  let controller: EarningSourcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EarningSourcesController],
    }).compile();

    controller = module.get<EarningSourcesController>(EarningSourcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
