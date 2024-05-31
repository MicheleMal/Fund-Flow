import { Injectable, Request } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { decryptEmail, encryptEmail } from 'src/utils/crypto.util';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getInformationUser(request: Request): Promise<UserDto> {
    const _id = request['user']._id;

    const user = await this.userModel.findById(_id).exec();

    user.email = decryptEmail(user.email);

    return user;
  }

  async updateUser(request: Request, updateUserDto: UpdateUserDto): Promise<UpdateUserDto>{

    const _id = request["user"]._id

    if(updateUserDto.email){
        updateUserDto.email = encryptEmail(updateUserDto.email)
    }

    if(updateUserDto.password){
        const saltRounds = 10;
        updateUserDto.password = bcrypt.hashSync(updateUserDto.password, saltRounds)
    }

    const updateUser = await this.userModel.findOneAndUpdate({_id: _id}, updateUserDto, {new: true}).exec()
    
    updateUser.email = decryptEmail(updateUser.email)
  
    return updateUser
  }

  //? Eliminare anche tutti i riferimenti dell'utente nelle altre tabelle
  async deleteUser(request: Request): Promise<UserDto>{
    const _id = request["user"]._id

    const deleteUser = await this.userModel.findOneAndDelete({_id: _id}).exec()

    return deleteUser
  }

}
