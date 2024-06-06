import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";
import { ExpenseSource } from "./ExpenseSource.schema";
import { User } from "./User.schema";

export type ExpenseDocument = HydratedDocument<Expense>

@Schema()
export class Expense{
    
    @Prop({type: String, required: false})
    expense_description: string

    @Prop({type: Number, required: false})
    expense_amount: number

    @Prop({type: Date, required: false, default: Date.now})
    expense_date: Date

    @Prop({type: SchemaTypes.ObjectId, ref: ExpenseSource.name})
    id_expense_source: Types.ObjectId

    @Prop({type: SchemaTypes.ObjectId, ref: User.name})
    id_user: Types.ObjectId
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense)

ExpenseSchema.pre("findOneAndUpdate", function(next){
    const expenses = this.getUpdate()

    Object.keys(expenses).forEach((key)=>{
        if(typeof(expenses[key])==="string"){
            expenses[key] = expenses[key].trim()
        }
    })

    next()
})