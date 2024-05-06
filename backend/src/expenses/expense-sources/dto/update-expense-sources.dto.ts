import { PartialType } from '@nestjs/mapped-types';
import { ExpenseSourceDto } from './expense-sources.dto';

export class UpdateExpenseSourcesDto extends PartialType(ExpenseSourceDto) {}
