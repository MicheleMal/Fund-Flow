import { PartialType } from "@nestjs/mapped-types"
import { ExpensesDto } from "./expenses.dto"

export class UpdateExpenseDto extends PartialType(ExpensesDto){}