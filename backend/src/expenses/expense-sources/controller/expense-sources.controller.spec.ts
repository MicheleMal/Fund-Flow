import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseSourcesController } from './expense-sources.controller';

describe('ExpenseSourcesController', () => {
  let controller: ExpenseSourcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseSourcesController],
    }).compile();

    controller = module.get<ExpenseSourcesController>(ExpenseSourcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
