import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { Earning, EarningSchema } from 'src/schemas/Earning.schema';
import { EarningSource, EarningSourceSchema } from 'src/schemas/EarningSource.schema';
import { Expense, ExpenseSchema } from 'src/schemas/Expense.schema';
import { ExpenseSource, ExpenseSourceSchema } from 'src/schemas/ExpenseSource.schema';
import { TotalEarnings, TotalEarningsSchema } from 'src/schemas/TotalEarnings.schema';
import { TotalExpenses, TotalExpensesSchema } from 'src/schemas/TotalExpenses.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: Earning.name,
        schema: EarningSchema
      },
      {
        name: EarningSource.name,
        schema: EarningSourceSchema
      },
      {
        name: Expense.name,
        schema: ExpenseSchema
      },
      {
        name: ExpenseSource.name,
        schema: ExpenseSourceSchema
      },
      {
        name: TotalEarnings.name,
        schema: TotalEarningsSchema
      },
      {
        name: TotalExpenses.name,
        schema: TotalExpensesSchema
      },
    ]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
