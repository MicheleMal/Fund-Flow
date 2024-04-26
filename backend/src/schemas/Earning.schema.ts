import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { EarningSource } from './EarningSource.schema';

export type IncomeDocument = HydratedDocument<Earning>;

@Schema()
export class Earning {
  @Prop({ type: String, required: false })
  earning_description: string;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: Date, required: true, default: Date.now })
  earning_date: Date;

  @Prop({ types: SchemaTypes.ObjectId, ref: EarningSource.name })
  id_earning_source: Types.ObjectId;
}

export const EarningSchema = SchemaFactory.createForClass(Earning);
