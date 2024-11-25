import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ExpenseSourceDto } from '../dto/expense-sources.dto';
import { ExpenseSourcesService } from '../service/expense-sources.service';
import { UpdateExpenseSourcesDto } from '../dto/update-expense-sources.dto';
import { AuthGuard } from 'src/users/auth/guard/auth.guard';

@Controller('expense-sources')
export class ExpenseSourcesController {
  constructor(private readonly expenseSourceService: ExpenseSourcesService) {}

  // /expense-sources/all or /all?et=Fixed|Variable
  @UseGuards(AuthGuard)
  @Get('all')
  getAllExpenseSource(
    @Request() request: Request,
    @Query('ext') exst?: 'Fixed' | 'Variable'
  ): Promise<ExpenseSourceDto[]> {
    return this.expenseSourceService.getAllExpenseSource(request, exst);
  }

    // /:id
    @UseGuards(AuthGuard)
    @Get(':id')
    getEarningSourceById(
      @Param('id') _id: string,
    ): Promise<ExpenseSourceDto> {
      return this.expenseSourceService.getEarningSourceById(_id);
    }

  // /expense-sources/insert
  @UseGuards(AuthGuard)
  @Post('insert')
  insertExpenseSource(
    @Body(ValidationPipe) expenseSourceDto: ExpenseSourceDto,
    @Request() request: Request
  ): Promise<ExpenseSourceDto> {
    return this.expenseSourceService.insertNewExpenseSource(expenseSourceDto, request);
  }

  // /expense-sources/update/:id
  @UseGuards(AuthGuard)
  @Patch('update/:id')
  updateExpenseSource(
    @Body(ValidationPipe) updateExpenseSourcesDto: UpdateExpenseSourcesDto,
    @Param('id') id: string,
    @Request() request: Request
  ): Promise<UpdateExpenseSourcesDto> {
    return this.expenseSourceService.updateExpenseSource(
      updateExpenseSourcesDto,
      id
    );
  }

  // /expense-sources/delete/:id
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  deleteExpenseSource(@Param('id') id:string): Promise<ExpenseSourceDto>{
    return this.expenseSourceService.deleteExpenseSource(id)
  }
}
