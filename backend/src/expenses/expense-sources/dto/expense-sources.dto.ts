import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class ExpenseSourceDto {
  @IsString({
    message: 'Enter a string format',
  })
  @IsNotEmpty()
  expense_source_name: string;

  @IsEnum(['Fixed', 'Variable'], {
    message: 'Valid expense type required',
  })
  @IsNotEmpty()
  expense_type: 'Fixed' | 'Variable' = 'Variable';
}
