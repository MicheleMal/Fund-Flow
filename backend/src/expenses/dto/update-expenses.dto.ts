import { PartialType } from "@nestjs/mapped-types"
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Types } from "mongoose"
import { ExpensesDto } from "./expenses.dto"

export class UpdateExpenseDto extends PartialType(ExpensesDto){}