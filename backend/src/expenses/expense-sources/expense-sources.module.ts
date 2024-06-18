import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ExpenseSourcesController } from './controller/expense-sources.controller';
import { ExpenseSourcesService } from './service/expense-sources.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseSource, ExpenseSourceSchema } from 'src/schemas/ExpenseSource.schema';
import { ObjectIdValidationMiddleware } from 'src/middleware/object-id-validation/object-id-validation.middleware';
import { Expense, ExpenseSchema } from 'src/schemas/Expense.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: ExpenseSource.name, schema: ExpenseSourceSchema},
      {name: Expense.name, schema: ExpenseSchema},
    ])
  ],
  controllers: [ExpenseSourcesController],
  providers: [ExpenseSourcesService]
})
export class ExpenseSourcesModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(ObjectIdValidationMiddleware).forRoutes(
      {path: "expense-sources/update/:id", method: RequestMethod.PATCH},
      {path: "expense-sources/delete/:id", method: RequestMethod.DELETE}
    )
  }
}
