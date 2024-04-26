import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IncomeSourcesDocument = HydratedDocument<EarningSource>;

@Schema()
export class EarningSource {
  @Prop({ type: String, required: true, unique: true })
  source_name: string;
}

export const EarningSourceSchema = SchemaFactory.createForClass(EarningSource);
