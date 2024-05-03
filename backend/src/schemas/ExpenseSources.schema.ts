import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExpenseCategoryDocument = HydratedDocument<ExpenseCategory>;

@Schema()
export class ExpenseCategory {
  @Prop({ type: String, required: true, unique: true })
  expense_source_name: string;

  @Prop({ enum: ['Fixed', 'Variable'], required: true, default: 'Variable' })
  expense_type: 'Fixed' | 'Variable';
}

export const ExpenseCategorySchema =
  SchemaFactory.createForClass(ExpenseCategory);
