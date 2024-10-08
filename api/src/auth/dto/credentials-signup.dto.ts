import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from 'src/utils/decorators/match.decorator';

export class CredentialsSignupDto {
  @ApiProperty({ example: 'mail@example.com' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  password: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(4, {
    message: 'Confirm password must be at least 4 characters long',
  })
  @Match('password')
  confirmPassword: string;
}
