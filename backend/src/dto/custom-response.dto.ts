import { IsBoolean, IsString } from "class-validator"

export class CustomResppnseDto{

    @IsString()
    message: string

    data: any

    @IsBoolean()
    success: boolean

}