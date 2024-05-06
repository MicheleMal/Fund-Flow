import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ExpenseSourcesController } from './controller/expense-sources.controller';
import { ExpenseSourcesService } from './service/expense-sources.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseSource, ExpenseSourceSchema } from 'src/schemas/ExpenseSource.schema';
import { ObjectIdValidationMiddleware } from 'src/middleware/object-id-validation/object-id-validation.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: ExpenseSource.name, schema: ExpenseSourceSchema}
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
