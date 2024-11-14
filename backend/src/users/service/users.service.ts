import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { decryptEmail, encryptEmail } from 'src/utils/crypto.util';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Earning } from 'src/schemas/Earning.schema';
import { EarningSource } from 'src/schemas/EarningSource.schema';
import { Expense } from 'src/schemas/Expense.schema';
import { ExpenseSource } from 'src/schemas/ExpenseSource.schema';
import { TotalEarnings } from 'src/schemas/TotalEarnings.schema';
import { TotalExpenses } from 'src/schemas/TotalExpenses.schema';
import { EmailService } from 'src/email/service/email.service';


@Injectable()
export class UsersService {
  constructor(
    private readonly emailService: EmailService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Earning.name) private readonly earningModel: Model<Earning>,
    @InjectModel(EarningSource.name) private readonly earningSourceModel: Model<EarningSource>,
    @InjectModel(Expense.name) private readonly expenseModel: Model<Expense>,
    @InjectModel(ExpenseSource.name) private readonly expenseSourceModel: Model<ExpenseSource>,
    @InjectModel(TotalEarnings.name) private readonly totalEarningModel: Model<TotalEarnings>,
    @InjectModel(TotalExpenses.name) private readonly totalExpenseModel: Model<TotalExpenses>,
  ) {}

  async getInformationUser(request: Request): Promise<UserDto> {
    const _id = request['user']._id;

    const user = await this.userModel.findById(_id).exec();

    user.email = decryptEmail(user.email);

    return user;
  }

  async updateUser(request: Request, updateUserDto: UpdateUserDto): Promise<UpdateUserDto>{

    console.log(updateUserDto)
    const _id = request["user"]._id

    if(updateUserDto.email){
        updateUserDto.email = encryptEmail(updateUserDto.email)
    }

    if(updateUserDto.password){
        const saltRounds = 10;
        updateUserDto.password = bcrypt.hashSync(updateUserDto.password, saltRounds)
    }

    const updateUser = await this.userModel.findOneAndUpdate({_id: _id}, updateUserDto, {new: true}).exec()

    const emailDecrypted = decryptEmail(updateUser.email)
    updateUser.email = emailDecrypted

    this.emailService.sendUpdateUserEmail(emailDecrypted)
  
    return updateUser
  }

  async deleteUser(request: Request): Promise<UserDto>{
    const _id = request["user"]._id

    const deleteUser = await this.userModel.findOneAndDelete({_id: _id}).exec()

    if(deleteUser){
      await this.earningModel.deleteMany({
        id_user: _id
      }).exec()

      await this.earningSourceModel.deleteMany({
        id_user: _id
      }).exec()

      await this.expenseModel.deleteMany({
        id_user: _id
      }).exec()

      await this.expenseSourceModel.deleteMany({
        id_user: _id
      }).exec()
      
      await this.totalEarningModel.deleteMany({
        id_user: _id
      }).exec()
      
      await this.totalExpenseModel.deleteMany({
        id_user: _id
      }).exec()
    }

    const emailDecrypted = decryptEmail(deleteUser.email)
    this.emailService.sendDeleteUserEmail(emailDecrypted)

    return deleteUser
  }

}
