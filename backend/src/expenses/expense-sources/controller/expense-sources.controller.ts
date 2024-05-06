import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ExpenseSourceDto } from '../dto/expense-sources.dto';
import { ExpenseSourcesService } from '../service/expense-sources.service';
import { UpdateExpenseSourcesDto } from '../dto/update-expense-sources.dto';

@Controller('expense-sources')
export class ExpenseSourcesController {
  constructor(private readonly expenseSourceService: ExpenseSourcesService) {}

  // /expense-sources/all or /all?et=Fixed|Variable
  @Get('all')
  getAllExpenseSource(
    @Query('ext') ext?: 'Fixed' | 'Variable',
  ): Promise<ExpenseSourceDto[]> {
    return this.expenseSourceService.getAllExpenseSource(ext);
  }

  // /expense-sources/insert
  @Post('insert')
  insertExpenseSource(
    @Body(ValidationPipe) expenseSourceDto: ExpenseSourceDto,
  ): Promise<ExpenseSourceDto> {
    return this.expenseSourceService.insertNewExpenseSource(expenseSourceDto);
  }

  // /expense-sources/update/:id
  @Patch('update/:id')
  updateExpenseSource(
    @Body(ValidationPipe) updateExpenseSourcesDto: UpdateExpenseSourcesDto,
    @Param('id') id: string,
  ): Promise<UpdateExpenseSourcesDto> {
    return this.expenseSourceService.updateExpenseSource(
      updateExpenseSourcesDto,
      id,
    );
  }

  // /expense-sources/delete/:id
  @Delete('delete/:id')
  deleteExpenseSource(@Param('id') id:string): Promise<ExpenseSourceDto>{
    return this.expenseSourceService.deleteExpenseSource(id)
  }
}
