import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { ExpensesService } from '../service/expenses.service';
import { ExpenseCategoryDto } from '../dto/expense-sources.dto';

/*
Inserimento nuova uscita
Visualizzare tutte le uscite
Visulizzare un deteminata uscita
Modifica uscita
Eliminare uscita
Visualizzare tutte le uscite di tipo fissa o variabile
*/

@Controller('expenses')
export class ExpensesController {

    constructor(private readonly expensesService: ExpensesService){}

    // // /expenses/category/all or ? ext = Fixed | Variable
    // @Get('category/all')
    // getAllExpenseCategories(@Query('ext') ext?: "Fixed" | "Variable"): Promise<ExpenseCategoryDto[]>{
    //     return this.expensesService.getAllExpenseCategories(ext)
    // }

    // // /expenses/category/insert
    // @Post('category/insert')
    // insertExpenseCategory(@Body(ValidationPipe) expenseCategoryDto: ExpenseCategoryDto): Promise<ExpenseCategoryDto>{
    //     return this.expensesService.insertNewExpenseCategory(expenseCategoryDto)
    // }
}
