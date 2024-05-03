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
import { EarningSourcesModule } from './earning-sources/earning-sources.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Earning.name,
        schema: EarningSchema,
      },
      {
        name: TotalEarnings.name,
        schema: TotalEarningsSchema,
      },
    ]),
    EarningSourcesModule,
  ],
  controllers: [EarningsController],
  providers: [EarningsService],
})
export class EarningsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ObjectIdValidationMiddleware).exclude(
      {path: 'earnings/all', method: RequestMethod.GET}
    )
    .forRoutes(
      { path: 'earnings/:id', method: RequestMethod.GET },
      {path:'earnings/update/:id', method: RequestMethod.PATCH},
      { path: 'earnings/delete/:id', method: RequestMethod.DELETE },
    );
  }
}
