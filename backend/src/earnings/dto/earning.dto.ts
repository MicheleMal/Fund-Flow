import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {Types } from 'mongoose';

export class EarningDto {
  @IsString({
    message: 'Enter a string format',
  })
  earning_description: string;

  @IsNumber()
  @IsNotEmpty()
  earning_amount: number;

  @IsDateString()
  earning_date: Date;

  @IsNotEmpty()
  id_earning_source: Types.ObjectId;

  // @IsNotEmpty()
  // id_user: Types.ObjectId;
}
