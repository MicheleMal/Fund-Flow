import { Transform } from 'class-transformer';
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

  @Transform((value)=>value || new Date(), {toClassOnly: true})
  // @IsDateString()
  earning_date: Date;

  @IsNotEmpty()
  id_earning_source: Types.ObjectId;

  // @IsNotEmpty()
  // id_user: Types.ObjectId;
}
