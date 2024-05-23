import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsString, MinLength } from "class-validator"
import { UserDto } from "./user.dto";

export class UpdateUserDto extends PartialType(UserDto){}