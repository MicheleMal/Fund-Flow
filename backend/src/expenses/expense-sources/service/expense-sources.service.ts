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
import { exec } from 'child_process';

@Injectable()
export class ExpenseSourcesService {
  constructor(
    @InjectModel(ExpenseSource.name)
    private readonly expenseSourceModel: Model<ExpenseSource>,
    @InjectModel(Expense.name)
    private readonly expenseModel: Model<Expense>,
  ) {}

  // Get all expense source or specify expense type (Fixed, Variable)
  async getAllExpenseSource(
    request: Request,
    expenseType?: 'Fixed' | 'Variable',
  ): Promise<ExpenseSourceDto[]> {
    const id_user = request["user"]._id
    let allExpenseCategories: ExpenseSourceDto[];

    if (expenseType) {
      allExpenseCategories = await this.expenseSourceModel
        .find({
          id_user: id_user,
          expense_type: expenseType,
        })
        .exec();

      if (allExpenseCategories.length === 0) {
        throw new NotFoundException(
          `Nessuna categoria di uscita di tipo ${expenseType} inserita`,
        );
      }
      return allExpenseCategories;
    } else {
      allExpenseCategories = await this.expenseSourceModel.find({
        id_user: id_user
      }).exec();

      if (allExpenseCategories.length === 0) {
        throw new NotFoundException('Nessuna categoria di uscite inserita');
      }
      return allExpenseCategories;
    }
  }

  // Insert new expense source
  async insertNewExpenseSource(
    expenseSourceDto: ExpenseSourceDto,
    request: Request
  ): Promise<ExpenseSourceDto> {
    const id_user = request["user"]._id
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
        id_user: id_user
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
      .findByIdAndDelete(_id)
      .exec();

    if(deleteExpenseSource){
      this.expenseModel.deleteMany({
        id_expense_source: deleteExpenseSource._id
      }).exec()

      return deleteExpenseSource;
    }

    if (!deleteExpenseSource) {
      throw new NotFoundException(
        'Nessuna fonte di uscita trovata da eliminare',
      );
    }

    
  }
}
