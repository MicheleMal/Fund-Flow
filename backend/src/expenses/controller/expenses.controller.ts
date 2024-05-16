import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ExpensesService } from '../service/expenses.service';
import { ExpensesDto } from '../dto/expenses.dto';
import { UpdateExpenseDto } from '../dto/update-expenses.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  // expenses/all
  @Get('all')
  getAll(): Promise<ExpensesDto[]> {
    return this.expensesService.getAllExpenses();
  }

  // /expenses/:id
  @Get(':id')
  getExpenseById(@Param('id') id: string): Promise<ExpensesDto>{
    return this.expensesService.getExpenseById(id)
  }

  // expenses/insert
  @Post('insert')
  insert(@Body(ValidationPipe) expensesDto: ExpensesDto): Promise<ExpensesDto> {
    return this.expensesService.insertNewExpense(expensesDto);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateExpenseDto: UpdateExpenseDto,
  ): Promise<UpdateExpenseDto> {
    return this.expensesService.updateExpense(id, updateExpenseDto);
  }

  // expenses/delete
  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<ExpensesDto> {
    return this.expensesService.deleteExpense(id);
  }
}
