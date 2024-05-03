import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class EarningSourceDto {
  @IsString({
    message: 'Enter a string format',
  })
  @IsNotEmpty()
  earning_source_name: string;

  @IsEnum(['Fixed', 'Variable'], {
    message: 'Valid earning type required',
  })
  @IsNotEmpty()
  earning_type: 'Fixed' | 'Variable' = 'Variable';
}
