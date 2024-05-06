import { Module } from '@nestjs/common';
import { ExpensesService } from './service/expenses.service';
import { ExpenseSourcesModule } from './expense-sources/expense-sources.module';

@Module({
  imports: [
    ExpenseSourcesModule
  ],
  controllers: [],
  providers: [ExpensesService]
})
export class ExpensesModule {}