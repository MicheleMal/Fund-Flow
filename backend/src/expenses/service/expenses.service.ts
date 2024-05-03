import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ExpenseCategoryDto } from '../dto/expense-sources.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExpenseCategory } from 'src/schemas/ExpenseSources.schema';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel('ExpenseCategory')
    private readonly expenseCategoryModel: Model<ExpenseCategory>,
  ) {}

  // // Get all expense categories or specify expense type (Fixed, Variable)
  // async getAllExpenseCategories(
  //   expenseType?: 'Fixed' | 'Variable',
  // ): Promise<ExpenseCategoryDto[]> {
  //   let allExpenseCategories: ExpenseCategoryDto[];

  //   if (expenseType) {
  //     allExpenseCategories = await this.expenseCategoryModel.find({
  //       expense_type: expenseType,
  //     }).exec();

  //     if (allExpenseCategories.length === 0) {
  //       throw new NotFoundException(
  //         `Nessuna categoria di uscita di tipo ${expenseType} inserita`,
  //       );
  //     }
  //     return allExpenseCategories;
  //   } else {
  //     allExpenseCategories = await this.expenseCategoryModel.find().exec();

  //     if (allExpenseCategories.length === 0) {
  //       throw new NotFoundException('Nessuna categoria di uscite inserita');
  //     }
  //     return allExpenseCategories;
  //   }
  // }

  // // Insert new expense category
  // async insertNewExpenseCategory(
  //   expenseCategoryDto: ExpenseCategoryDto,
  // ): Promise<ExpenseCategoryDto> {
  //   const isUniqueExpenseCategory = await this.expenseCategoryModel
  //     .exists({
  //       category_name: expenseCategoryDto.category_name,
  //     })
  //     .exec();

  //   if (isUniqueExpenseCategory) {
  //     throw new ConflictException('Categoria già inserita');
  //   }

  //   return this.expenseCategoryModel.create(expenseCategoryDto);
  // }
}
