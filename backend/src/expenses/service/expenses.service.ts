import {
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ExpensesService {

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
