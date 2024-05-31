import { IsNotEmpty, IsNumber } from "class-validator"

export class TotalExpensesDto{

    @IsNumber()
    @IsNotEmpty()
    expenses_total: number

    @IsNumber()
    @IsNotEmpty()
    month: number

    @IsNumber()
    @IsNotEmpty()
    year: number
}