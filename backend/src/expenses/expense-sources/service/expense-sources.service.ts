import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExpenseSource } from 'src/schemas/ExpenseSource.schema';
import { ExpenseSourceDto } from '../dto/expense-sources.dto';
import { UpdateExpenseSourcesDto } from '../dto/update-expense-sources.dto';
import { Expense } from 'src/schemas/Expense.schema';
import { TotalExpenses } from 'src/schemas/TotalExpenses.schema';

@Injectable()
export class ExpenseSourcesService {
  constructor(
    @InjectModel(ExpenseSource.name)
    private readonly expenseSourceModel: Model<ExpenseSource>,
    @InjectModel(Expense.name)
    private readonly expenseModel: Model<Expense>,
    @InjectModel(TotalExpenses.name)
    private readonly totalExpenseModel: Model<TotalExpenses>,
  ) {}

  // Get a source of earning by id
  async getEarningSourceById(_id: string): Promise<ExpenseSourceDto>{

    const expenseSource = await this.expenseSourceModel.findById(_id).exec()

    if(!expenseSource){
      throw new NotFoundException("Nessuna fonte di spesa trovata")
    }

    return expenseSource
  }

  // Get all expense source or specify expense type (Fixed, Variable)
  async getAllExpenseSource(
    request: Request,
    expenseSourceType?: 'Fixed' | 'Variable',
  ): Promise<ExpenseSourceDto[]> {
    const id_user = request['user']._id;
    let allExpenseCategories: ExpenseSourceDto[];

    if (expenseSourceType) {
      allExpenseCategories = await this.expenseSourceModel
        .find({
          id_user: id_user,
          expense_type: expenseSourceType,
        })
        .exec();

      if (allExpenseCategories.length === 0) {
        throw new NotFoundException(
          `Nessuna categoria di uscita di tipo ${expenseSourceType} inserita`,
        );
      }
      return allExpenseCategories;
    } else {
      allExpenseCategories = await this.expenseSourceModel
        .find({
          id_user: id_user,
        })
        .exec();

      if (allExpenseCategories.length === 0) {
        throw new NotFoundException('Nessuna categoria di uscite inserita');
      }
      return allExpenseCategories;
    }
  }

  // Insert new expense source
  async insertNewExpenseSource(
    expenseSourceDto: ExpenseSourceDto,
    request: Request,
  ): Promise<ExpenseSourceDto> {
    const id_user = request['user']._id;
    const isUniqueExpenseSource = await this.expenseSourceModel
      .exists({
        expense_source_name: expenseSourceDto.expense_source_name,
      })
      .exec();
    if (isUniqueExpenseSource) {
      throw new ConflictException('Fonte già inserita');
    }

    return this.expenseSourceModel.create({
      ...expenseSourceDto,
      id_user: id_user,
    });
  }

  // Update expense source
  async updateExpenseSource(
    updateExpenseSourceDto: UpdateExpenseSourcesDto,
    _id: string,
  ): Promise<UpdateExpenseSourcesDto> {
    const updateExpenseSource = await this.expenseSourceModel
      .findByIdAndUpdate(_id, updateExpenseSourceDto, { new: true })
      .exec();

    if (!updateExpenseSource) {
      throw new NotFoundException(
        'Nessuna fonte di uscita trovata da modificare',
      );
    }

    return updateExpenseSource;
  }

  // Delete expese source
  async deleteExpenseSource(_id: string): Promise<ExpenseSourceDto> {
    const deleteExpenseSource = await this.expenseSourceModel
      .findOneAndDelete({
        _id: _id,
      })
      .exec();

    if (deleteExpenseSource) {
      const deleteExpense = await this.expenseModel
        .find({
          id_expense_source: deleteExpenseSource._id,
        })
        .exec();

      deleteExpense.map(async (expense) => {
        await this.totalExpenseModel
          .updateMany(
            {
              month: expense.expense_date.getMonth() + 1,
              year: expense.expense_date.getFullYear(),
            },
            {
              $inc: { expenses_total: -expense.expense_amount },
            },
          )
          .exec();
      });

      await this.expenseModel.deleteMany({
        id_expense_source: _id,
      });

      return deleteExpenseSource;
    }

    if (!deleteExpenseSource) {
      throw new NotFoundException(
        'Nessuna fonte di uscita trovata da eliminare',
      );
    }
  }
}
