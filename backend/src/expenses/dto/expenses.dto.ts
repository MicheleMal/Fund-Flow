import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class ExpensesDto {
  @IsString({
    message: 'Enter a string format',
  })
  expense_description: string;

  @IsNumber()
  @IsNotEmpty()
  expense_amount: number;

  @Transform((value) => value || new Date(), { toClassOnly: true })
  // @IsDateString()
  expense_date: Date;

  @IsNotEmpty()
  id_expense_source: Types.ObjectId;

  // id_user
}
