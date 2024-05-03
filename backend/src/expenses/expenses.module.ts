import { Module } from '@nestjs/common';
import { ExpensesController } from './controller/expenses.controller';
import { ExpensesService } from './service/expenses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseCategory, ExpenseCategorySchema } from 'src/schemas/ExpenseSources.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ExpenseCategory.name,
        schema: ExpenseCategorySchema
      }
    ])
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService]
})
export class ExpensesModule {}