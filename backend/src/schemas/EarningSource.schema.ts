import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EarningSourceDocument = HydratedDocument<EarningSource>;

@Schema()
export class EarningSource {
  @Prop({ type: String, required: true, unique: true })
  earning_source_name: string;

  @Prop({ enum: ['Fixed', 'Variable'], default: "Variable",required: true })
  earning_type: 'Fixed' | 'Variable';
}

export const EarningSourceSchema = SchemaFactory.createForClass(EarningSource);
