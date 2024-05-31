import { IsNotEmpty, IsNumber } from "class-validator"

export class TotalEarningsDto{

    @IsNumber()
    @IsNotEmpty()
    earnings_total: number

    @IsNumber()
    @IsNotEmpty()
    month: number

    @IsNumber()
    @IsNotEmpty()
    year: number
}