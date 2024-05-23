import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login-user.dto';
import { AuthGuard } from '../guard/auth.guard';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Post("register")
    register(@Body(ValidationPipe)userDto: UserDto): Promise<UserDto>{
        return this.usersService.registerNewUser(userDto)
    }

    @Post("login")
    login(@Body(ValidationPipe) loginDto: LoginDto){
        return this.usersService.login(loginDto)
    }
}
