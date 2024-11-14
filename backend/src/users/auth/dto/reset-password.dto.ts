import { IsNumber, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNumber()
  otp: number;

  @IsString({
    message: 'Enter a string format',
  })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  new_password: string;
}
