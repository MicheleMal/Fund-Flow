import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { User } from './User.schema';

export type ExpenseCategoryDocument = HydratedDocument<ExpenseSource>;

@Schema()
export class ExpenseSource {
  @Prop({ type: String, required: true, unique: true })
  expense_source_name: string;

  @Prop({ enum: ['Fixed', 'Variable'], required: true, default: 'Variable' })
  expense_type: 'Fixed' | 'Variable';

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  id_user: Types.ObjectId;
}

export const ExpenseSourceSchema =
  SchemaFactory.createForClass(ExpenseSource);

ExpenseSourceSchema.pre("findOneAndUpdate", function(next){
  const expenseSources = this.getUpdate()

  Object.keys(expenseSources).forEach((key)=>{
    if(typeof(expenseSources[key])==="string"){
      expenseSources[key] = expenseSources[key].trim()
    }
  }) 
  next()
})

ExpenseSourceSchema.pre("save", function(next){
  this.expense_source_name = this.expense_source_name.trim()

  next()
})