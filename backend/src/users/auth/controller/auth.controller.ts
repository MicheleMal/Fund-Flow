import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { LoginDto } from '../dto/login-user.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post("register")
    register(@Body(ValidationPipe)userDto: UserDto): Promise<UserDto>{
        return this.authService.registerNewUser(userDto)
    }

    @Post("login")
    login(@Body(ValidationPipe) loginDto: LoginDto){
        return this.authService.login(loginDto)
    }
}
