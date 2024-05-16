import {
  Get,
  MiddlewareConsumer,
  Module,
  Req,
  RequestMethod,
} from '@nestjs/common';
import { ExpensesService } from './service/expenses.service';
import { ExpenseSourcesModule } from './expense-sources/expense-sources.module';
import { ExpensesController } from './controller/expenses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from 'src/schemas/Expense.schema';
import { ObjectIdValidationMiddleware } from 'src/middleware/object-id-validation/object-id-validation.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Expense.name,
        schema: ExpenseSchema,
      },
    ]),
    ExpenseSourcesModule,
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ObjectIdValidationMiddleware)
      .exclude({
        path: 'expenses/all',
        method: RequestMethod.GET,
      })
      .forRoutes(
        {
          path: 'expenses/delete/:id',
          method: RequestMethod.DELETE,
        },
        {
          path: 'expenses/update/:id',
          method: RequestMethod.PATCH,
        },
        {
          path: 'expenses/:id',
          method: RequestMethod.GET,
        },
      );
  }
}
