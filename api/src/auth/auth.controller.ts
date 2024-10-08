import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CredentialsSignupDto } from './dto/credentials-signup.dto';
import { CredentialsSigninDto } from './dto/credentials-signin.dto';
import { AuthService } from './auth.service';

@ApiTags('API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() payload: CredentialsSignupDto) {
    return await this.authService.signup(payload);
  }

  @Post('signin')
  async signin(@Body() payload: CredentialsSigninDto) {
    return await this.authService.signin(payload);
  }
}
