import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { UserDto } from 'src/users/dto/user.dto';
import { encryptEmail } from 'src/utils/crypto.util';
import { LoginDto } from '../dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async registerNewUser(userDto: UserDto): Promise<UserDto> {
    const saltRounds = 10;
    const pwHash = bcrypt.hashSync(userDto.password, saltRounds);

    const existingEmail = await this.userModel.exists({ email: encryptEmail(userDto.email.toLowerCase()) }).exec();
    const existingUsername = await this.userModel.exists({ username: userDto.username}).exec();

    if(existingEmail){
      throw new ConflictException("Email già inserita")
    }
    if(existingUsername){
      throw new ConflictException("Username già inserita")
    }

    const newUser = await this.userModel.create({
      ...userDto,
      password: pwHash
    });

    return newUser;
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const userFind = await this.userModel
      .findOne({
        email: encryptEmail(loginDto.email).toLowerCase(),
      })
      .exec();

    if (!userFind) {
      throw new UnauthorizedException('Email o password errate');
    }

    const pwValid = bcrypt.compareSync(
      loginDto.password,
      (
        await this.userModel
          .findOne({ email: encryptEmail(loginDto.email) })
          .exec()
      ).password,
    );

    if (!pwValid) {
      throw new UnauthorizedException('Email o password errate');
    }

    const payload = {
      _id: userFind._id,
    };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
