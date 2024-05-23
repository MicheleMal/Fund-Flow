import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { decryptEmail, encryptEmail } from 'src/utils/crypto.util';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

/*
1. Inserimento nuovo utente (cript password ed email)
2. Visualizzare informazioni di un determinato utente
3. Modifica informazione utente
4. Eliminazione utente con le relative informazioni nelle altre tabelle
*/

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService
  ) {}

  async registerNewUser(userDto: UserDto): Promise<UserDto> {
    const saltRounds = 10;
    const pwHash = bcrypt.hashSync(userDto.password, saltRounds);

    const existingEmail = (await this.userModel.findOne({email: encryptEmail(userDto.email.toLocaleLowerCase().trim())}).exec())?.email
    const existingUsername = (await this.userModel.findOne({username: userDto.username.trim()}).exec())?.username

    if(existingEmail){
      throw new ConflictException("Email già registata")
    }
    if(existingUsername){
      throw new ConflictException("Username già presente")
    }

    const newUser = await this.userModel.create({
      username: userDto.username.trim(),
      email: encryptEmail(userDto.email.toLowerCase().trim()),
      password: pwHash,
    });  

    return newUser;
  }

  async login(loginDto: LoginDto): Promise<{token: string}> {

    const userFind  = await this.userModel.findOne(
        {
            email: encryptEmail(loginDto.email).toLowerCase().trim()
        }).exec()

    if(!userFind){
        throw new UnauthorizedException("Email o password errate")
    }

    const pwValid = bcrypt.compareSync(
      loginDto.password,
      (await this.userModel.findOne({ email: encryptEmail(loginDto.email.trim()) }).exec()).password,
    );

    if(!pwValid){
        throw new UnauthorizedException("Email o password errate")
    }

    const payload = {
      _id: userFind._id,
    }

    return {
      token: await this.jwtService.signAsync(payload)
    };
  }
}
