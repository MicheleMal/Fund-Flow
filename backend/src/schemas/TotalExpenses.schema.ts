import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { User } from './User.schema';

export type TotalExpensesDocument = HydratedDocument<TotalExpenses>;

@Schema()
export class TotalExpenses {
  @Prop({ type: Number, required: true })
  expenses_total: number;

  @Prop({ type: Number, required: true })
  month: number;

  @Prop({ type: Number, required: true })
  year: number;

  @Prop({type: SchemaTypes.ObjectId, ref: User.name})
  id_user: Types.ObjectId
}

export const TotalExpensesSchema = SchemaFactory.createForClass(TotalExpenses);
