import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type TotalEarningsDocument = HydratedDocument<TotalEarnings>;

@Schema()
export class TotalEarnings {
  @Prop({ type: Number, required: true })
  earnings_total: number;

  @Prop({ type: Number, required: true })
  month: number;

  @Prop({ type: Number, required: true })
  year: number;

  // @Prop({types: SchemaTypes.ObjectId, ref: })
  // id_user: Types.ObjectId
}

export const TotalEarningsSchema = SchemaFactory.createForClass(TotalEarnings);
