import { IsNotEmpty, IsString } from 'class-validator';

export class EarningSourceDto {
  @IsString({
    message: 'Enter a string format',
  })
  @IsNotEmpty()
  source_name: string;
}
