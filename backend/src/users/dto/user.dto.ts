import { IsEmail, IsString, MinLength } from "class-validator"

export class UserDto{
    @IsString({
        message: 'Enter a string format',
    })
    @MinLength(5, {
        message: "The minimum length of the username must be 8 characters"
    })
    username: string

    @IsEmail()
    email: string

    @IsString({
        message: 'Enter a string format',
    })
    @MinLength(8, {
        message: "Password must be at least 8 characters long"
    })
    password: string
}