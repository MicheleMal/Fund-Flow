import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { UserDto } from 'src/users/dto/user.dto';
import { decryptEmail, encryptEmail } from 'src/utils/crypto.util';
import { LoginDto } from '../dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/service/email.service';
import { TemporanyCodes } from 'src/schemas/TemporaryCodes.schema';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { CustomResppnseDto } from 'src/dto/custom-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(TemporanyCodes.name)
    private readonly temporanyCodeModel: Model<TemporanyCodes>,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async registerNewUser(userDto: UserDto): Promise<CustomResppnseDto> {
    const existingEmail = await this.userModel
      .exists({ email: encryptEmail(userDto.email.toLowerCase()) })
      .exec();
    const existingUsername = await this.userModel
      .exists({ username: userDto.username })
      .exec();

    if (existingEmail) {
      throw new ConflictException('Email già inserita');
    }
    if (existingUsername) {
      throw new ConflictException('Username già inserita');
    }

    this.emailService.sendWelcomeEmail(
      userDto.email.toLowerCase(),
      userDto.username,
    );

    const newUser = await this.userModel.create(userDto);

    return {
      message: 'Email di benvenuta inviata',
      data: newUser,
      success: true,
    };
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

  async generateTemporanyCode(email: string): Promise<CustomResppnseDto> {
    const code = Math.floor(1000 + Math.random() * 9000);

    const user = await this.userModel
      .findOne({ email: encryptEmail(email) })
      .exec();

    if (!user) {
      throw new NotFoundException('Email non registrata');
    }

    await this.temporanyCodeModel.create({
      code: code,
      id_user: user._id,
    });

    this.emailService.sendTemporanyCodeEmail(email, code);

    return {
      message: "Codice otp inviato via email",
      data: [],
      success: false
    };
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<CustomResppnseDto> {
    const checkOtp = await this.temporanyCodeModel.findOne({
      code: resetPasswordDto.otp,
    });

    if (!checkOtp) {
      throw new UnauthorizedException('Codice otp inserito errato');
    }

    const saltRounds = 10;
    const newPassord = bcrypt.hashSync(
      resetPasswordDto.new_password,
      saltRounds,
    );

    const userUpdated = await this.userModel
      .findByIdAndUpdate(
        checkOtp.id_user,
        {
          password: newPassord,
        },
        { new: true },
      )
      .exec();

    const emailDecrypted = decryptEmail(userUpdated.email);
    this.emailService.sendRestPasswordEmail(emailDecrypted);

    return {
      message: 'Password resettata',
      data: userUpdated,
      success: true,
    };
  }
}
