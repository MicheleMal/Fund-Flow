import { Body, Controller, Delete, Get, Patch, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UserDto } from '../dto/user.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CustomResppnseDto } from 'src/dto/custom-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('')
  get(@Request() request: Request): Promise<UserDto> {
    return this.usersService.getInformationUser(request);
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  updateUser(@Request() request: Request, @Body(ValidationPipe) updateUserDto: UpdateUserDto): Promise<CustomResppnseDto>{
    return this.usersService.updateUser(request, updateUserDto)
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  deleteUser(@Request() request: Request): Promise<CustomResppnseDto>{
    return this.usersService.deleteUser(request)
  }
}
