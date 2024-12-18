import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from 'src/schemas/Expense.schema';
import { ExpensesDto } from '../dto/expenses.dto';
import { UpdateExpenseDto } from '../dto/update-expenses.dto';
import { TotalExpenses } from 'src/schemas/TotalExpenses.schema';
import { TotalExpensesDto } from '../dto/total-expenses.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private readonly expenseModel: Model<Expense>,
    @InjectModel(TotalExpenses.name)
    private readonly totalExpensesModel: Model<TotalExpenses>,
  ) {}

  async getAllExpenses(request: Request): Promise<ExpensesDto[]> {
    const id_user = request["user"]._id
    const allExpenses = await this.expenseModel
      .find({
        id_user: id_user
      })
      .populate('id_expense_source')
      .populate('id_user')
      .exec();

    if (allExpenses.length == 0) {
      throw new NotFoundException('Nessuna uscita inserita');
    }

    return allExpenses;
  }

  async getTotalExpenses(request: Request): Promise<TotalExpensesDto[]>{
    
    const id_user = request["user"]._id
    const totals = await this.totalExpensesModel.find({id_user: id_user})
    .sort({'year': 'asc'})
    .sort({'month': 'asc'})
    .exec()

    if(totals.length===0){
      throw new NotFoundException("Nessuna uscita totale disponibile")
    }

    return totals
  }
  
  async getExpenseById(_id: string, request: Request): Promise<ExpensesDto> {
    const id_user = request["user"]._id
    const expense = await this.expenseModel.findById({
      _id: _id,
      id_user: id_user
    })
    .populate('id_expense_source')
    .populate('id_user')
    .exec();

    if (!expense) {
      throw new NotFoundException('Nessuna uscita trovata');
    }

    return expense;
  }

  async insertNewExpense(expenseDto: ExpensesDto, request: Request): Promise<ExpensesDto> {
    const id_user = request["user"]._id
    let expenseDate;

    if (!expenseDto.expense_date) {
      expenseDate = Date();
    } else {
      expenseDate = expenseDto.expense_date;
    }

    const amountUser = expenseDto.expense_amount;
    const monthUser = new Date(expenseDate).getMonth() + 1;
    const yearUser = new Date(expenseDate).getFullYear(); 

    this.totalExpensesModel
      .findOneAndUpdate(
        {
          month: monthUser,
          year: yearUser,
          id_user: id_user
        },
        {
          $inc: { expenses_total: expenseDto.expense_amount },
          $setOnInsert: { monthUser, amountUser, yearUser, id_user },
        },
        { upsert: true, new: true },
      )
      .exec();

    const newExpense = await this.expenseModel.create({
      ...expenseDto,
      id_user: id_user
    });

    return newExpense.populate('id_expense_source');
  }

  async updateExpense(
    _id: string,
    updateExpenseDto: UpdateExpenseDto,
    request: Request
  ): Promise<UpdateExpenseDto> {    
    const id_user = request["user"]._id

    // Find expense current
    const expenseCurrent = await this.expenseModel.findById({
      _id: _id,
      id_user: id_user
    })
    .populate('id_expense_source')
    .populate('id_user')
    .exec()

    // Update expense
    const updateExpese = await this.expenseModel
      .findByIdAndUpdate(_id, updateExpenseDto, { new: true })
      .populate('id_expense_source')
      .populate('id_user')
      .exec();

    if (!updateExpese) {
      throw new NotFoundException('Nessuna uscita trovato da modificare');
    }

    // If user inserted expense_amount
    const monthUser = expenseCurrent.expense_date.getMonth() + 1;
    const yearUser = expenseCurrent.expense_date.getFullYear();

    if(updateExpenseDto.expense_amount){      
      if (updateExpenseDto.expense_amount > expenseCurrent.expense_amount) {
        const totalExpense = await this.totalExpensesModel
          .findOne({ month: monthUser, year: yearUser })
          .exec();

          totalExpense.expenses_total = (totalExpense.expenses_total - expenseCurrent.expense_amount) + updateExpenseDto.expense_amount;

        await totalExpense.save();
      } else {
        const totalExpense = await this.totalExpensesModel
          .findOne({ month: monthUser, year: yearUser })
          .exec();
          totalExpense.expenses_total = totalExpense.expenses_total - (expenseCurrent.expense_amount - updateExpenseDto.expense_amount);

          await totalExpense.save()
      }
    }

    // If user inserted expense_date      
    if(updateExpenseDto.expense_date){              
      const monthInserted = new Date(updateExpenseDto.expense_date).getMonth()+1
      const yearInserted = new Date(updateExpenseDto.expense_date).getFullYear() 
      const expenseAmount = updateExpenseDto.expense_amount ? updateExpenseDto.expense_amount : expenseCurrent.expense_amount

      await this.totalExpensesModel.findOneAndUpdate({
        month: expenseCurrent.expense_date.getMonth()+1,
        year: expenseCurrent.expense_date.getFullYear()
      },{
        $inc: {expenses_total: -expenseAmount}
      }).exec()

      const totalExpense = await this.totalExpensesModel.findOneAndUpdate({
        month: monthInserted,
        year: yearInserted
      }, {
        $inc: {expenses_total: expenseAmount},
        $setOnInsert: {monthInserted, yearInserted, expenseAmount, id_user}
      }, {upsert: true, new: true}).exec()
      
    }
  
    return updateExpese;
  }

  async deleteExpense(_id: string): Promise<ExpensesDto> {
      const deleteExpense = await this.expenseModel.findByIdAndDelete(_id).exec();    

      if (!deleteExpense) {
              throw new NotFoundException('Nessuna uscita trovato da eliminare');
      }

      await this.totalExpensesModel.findOneAndUpdate(
        {
          year: deleteExpense.expense_date.getFullYear(),
          month: deleteExpense.expense_date.getMonth() + 1,
        },
        {
          $inc: { expenses_total: -deleteExpense.expense_amount },
        },
      )
      .exec();      

    return deleteExpense;
  
  }
}
