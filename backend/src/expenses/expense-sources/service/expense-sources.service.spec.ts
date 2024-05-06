import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseSourcesService } from './expense-sources.service';

describe('ExpenseSourcesService', () => {
  let service: ExpenseSourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseSourcesService],
    }).compile();

    service = module.get<ExpenseSourcesService>(ExpenseSourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
