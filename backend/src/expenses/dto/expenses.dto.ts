import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Types } from "mongoose"

export class ExpensesDto{

    @IsString({
        message: 'Enter a string format',
      })
    expense_description: string

    @IsNumber()
    @IsNotEmpty()
    expense_amount: number

    @IsDateString()
    expense_date: Date

    @IsNotEmpty()
    id_expense_source: Types.ObjectId

    // id_user
}