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

@Injectable()
export class ExpenseSourcesService {
  constructor(
    @InjectModel(ExpenseSource.name)
    private readonly expenseSourceModel: Model<ExpenseSource>,
  ) {}

  // Get all expense source or specify expense type (Fixed, Variable)
  async getAllExpenseSource(
    expenseType?: 'Fixed' | 'Variable',
  ): Promise<ExpenseSourceDto[]> {
    let allExpenseCategories: ExpenseSourceDto[];

    if (expenseType) {
      allExpenseCategories = await this.expenseSourceModel
        .find({
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
      allExpenseCategories = await this.expenseSourceModel.find().exec();

      if (allExpenseCategories.length === 0) {
        throw new NotFoundException('Nessuna categoria di uscite inserita');
      }
      return allExpenseCategories;
    }
  }

  // Insert new expense source
  async insertNewExpenseSource(
    expenseSourceDto: ExpenseSourceDto,
  ): Promise<ExpenseSourceDto> {
    const isUniqueExpenseSource = await this.expenseSourceModel
      .exists({
        expense_source_name: expenseSourceDto.expense_source_name.trim(),
      })
      .exec();
    if (isUniqueExpenseSource) {
      throw new ConflictException('Fonte già inserita');
    }

    return this.expenseSourceModel.create({
        expense_source_name: expenseSourceDto.expense_source_name.trim(),
        expense_type: expenseSourceDto.expense_type.trim()
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

    if (!deleteExpenseSource) {
      throw new NotFoundException(
        'Nessuna fonte di uscita trovata da eliminare',
      );
    }

    return deleteExpenseSource;
  }
}
