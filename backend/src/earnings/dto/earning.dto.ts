import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class EarningDto {
  @IsString({
    message: 'Enter a string format',
  })
  earning_description: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  //? Inserire se possibile valore di default
  //? Inserire controllo IsDate
  earning_date: Date;

  @IsNotEmpty()
  id_earning_source: Types.ObjectId;
}
