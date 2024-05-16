import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from 'src/schemas/Expense.schema';
import { ExpensesDto } from '../dto/expenses.dto';
import { UpdateExpenseDto } from '../dto/update-expenses.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private readonly expenseModel: Model<Expense>,
  ) {}

  async getAllExpenses(): Promise<ExpensesDto[]> {
    const allExpenses = await this.expenseModel
      .find()
      .populate('id_expense_source')
      .exec();

    if (allExpenses.length == 0) {
      throw new NotFoundException('Nessuna uscita inserita');
    }

    return allExpenses;
  }

  async getExpenseById(_id): Promise<ExpensesDto>{
    const expense = await this.expenseModel.findById(_id).exec()

    if(!expense){
      throw new NotFoundException('Nessuna uscita trovata');
    }
    
    return expense
  }

  async insertNewExpense(expenseDto: ExpensesDto): Promise<ExpensesDto> {
    const newExpense = await this.expenseModel.create({
      ...expenseDto,
      expense_description: expenseDto.expense_description.trim(),
    });

    return newExpense.populate("id_expense_source");
  }

  async updateExpense(
    _id: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<UpdateExpenseDto> {
    const updateExpese = await this.expenseModel
      .findByIdAndUpdate(_id, updateExpenseDto, { new: true })
      .populate('id_expense_source')
      .exec();

    if (!updateExpese) {
      throw new NotFoundException('Nessuna uscita trovato da modificare');
    }

    return updateExpese;
  }

  async deleteExpense(_id: string): Promise<ExpensesDto> {
    const deleteExpense = await this.expenseModel.findByIdAndDelete(_id).exec();
    
    if (!deleteExpense) {
      throw new NotFoundException('Nessuna uscita trovato da eliminare');
    }

    return deleteExpense;
  }
}
