import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { LoginDto } from '../dto/login-user.dto';
import { AuthService } from '../service/auth.service';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { CustomResppnseDto } from 'src/dto/custom-response.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post("register")
    register(@Body(ValidationPipe)userDto: UserDto): Promise<CustomResppnseDto>{
        return this.authService.registerNewUser(userDto)
    }

    @Post("login")
    login(@Body(ValidationPipe) loginDto: LoginDto){
        return this.authService.login(loginDto)
    }

    @Post("temporany-code")
    generateTemporanyCode(@Body("email") email: string): Promise<CustomResppnseDto>{
        return this.authService.generateTemporanyCode(email)
    }

    @Post('reset-password')
    resetPassword(@Body(ValidationPipe) resetPasswordDto: ResetPasswordDto): Promise<CustomResppnseDto>{
        return this.authService.resetPassword(resetPasswordDto)
    }
}
