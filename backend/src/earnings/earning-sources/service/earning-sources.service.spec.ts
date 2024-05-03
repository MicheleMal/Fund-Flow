import { Test, TestingModule } from '@nestjs/testing';
import { EarningSourcesService } from './earning-sources.service';

describe('EarningSourcesService', () => {
  let service: EarningSourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EarningSourcesService],
    }).compile();

    service = module.get<EarningSourcesService>(EarningSourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
