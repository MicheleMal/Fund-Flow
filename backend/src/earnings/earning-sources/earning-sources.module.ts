import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { EarningSourcesService } from './service/earning-sources.service';
import { EarningSourcesController } from './controller/earning-sources.controller';
import {
  EarningSource,
  EarningSourceSchema,
} from 'src/schemas/EarningSource.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ObjectIdValidationMiddleware } from 'src/middleware/object-id-validation/object-id-validation.middleware';
import { Earning, EarningSchema } from 'src/schemas/Earning.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EarningSource.name,
        schema: EarningSourceSchema,
      },
      {
        name: Earning.name,
        schema: EarningSchema,
      },
    ]),
  ],
  providers: [EarningSourcesService],
  controllers: [EarningSourcesController],
})
export class EarningSourcesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ObjectIdValidationMiddleware)
      .forRoutes(
        { path: 'earning-sources/update/:id', method: RequestMethod.PATCH },
        { path: 'earning-sources/delete/:id', method: RequestMethod.DELETE },
      );
  }
}
