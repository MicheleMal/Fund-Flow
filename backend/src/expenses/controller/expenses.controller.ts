import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ExpensesService } from '../service/expenses.service';
import { ExpensesDto } from '../dto/expenses.dto';
import { UpdateExpenseDto } from '../dto/update-expenses.dto';
import { AuthGuard } from 'src/users/auth/guard/auth.guard';
import { TotalExpensesDto } from '../dto/total-expenses.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  // expenses/all
  @UseGuards(AuthGuard)
  @Get('all')
  getAll(@Request() request: Request): Promise<ExpensesDto[]> {
    return this.expensesService.getAllExpenses(request);
  }

  // /expenses/totals
  @UseGuards(AuthGuard)
  @Get('totals')
  getTotalExpenses(@Request() request: Request): Promise<TotalExpensesDto[]>{
    return this.expensesService.getTotalExpenses(request)
  }

  // /expenses/:id
  @UseGuards(AuthGuard)
  @Get(':id')
  getExpenseById(@Param('id') id: string, @Request() request: Request): Promise<ExpensesDto>{
    return this.expensesService.getExpenseById(id, request)
  }

  // expenses/insert
  @UseGuards(AuthGuard)
  @Post('insert')
  insert(@Body(ValidationPipe) expensesDto: ExpensesDto, @Request() request: Request): Promise<ExpensesDto> {
    return this.expensesService.insertNewExpense(expensesDto, request);
  }

  @UseGuards(AuthGuard)
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateExpenseDto: UpdateExpenseDto,
    @Request() request: Request
  ): Promise<UpdateExpenseDto> {
    return this.expensesService.updateExpense(id, updateExpenseDto, request);
  }

  // expenses/delete
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<ExpensesDto> {
    return this.expensesService.deleteExpense(id);
  }
}
