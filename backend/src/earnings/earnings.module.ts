import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Earning, EarningSchema } from 'src/schemas/Earning.schema';
import { ObjectIdValidationMiddleware } from 'src/middleware/object-id-validation/object-id-validation.middleware';
import { EarningsController } from './controller/earnings.controller';
import { EarningsService } from './service/earnings.service';
import {
  EarningSource,
  EarningSourceSchema,
} from 'src/schemas/EarningSource.schema';
import {
  TotalEarnings,
  TotalEarningsSchema,
} from 'src/schemas/TotalEarnings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Earning.name,
        schema: EarningSchema,
      },
      {
        name: EarningSource.name,
        schema: EarningSourceSchema,
      },
      {
        name: TotalEarnings.name,
        schema: TotalEarningsSchema,
      },
    ]),
  ],
  controllers: [EarningsController],
  providers: [EarningsService],
})
export class EarningsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ObjectIdValidationMiddleware).forRoutes(
      { path: 'incomes/:id', method: RequestMethod.GET },
      // {path:'incomes/update/:id', method: RequestMethod.PATCH},
      { path: 'incomes/delete/:id', method: RequestMethod.DELETE },
    );
  }
}
