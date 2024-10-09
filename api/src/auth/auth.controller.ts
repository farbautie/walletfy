import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CredentialsSignupDto } from './dto/credentials-signup.dto';
import { CredentialsSigninDto } from './dto/credentials-signin.dto';
import { AuthService } from './auth.service';
import { RefreshGuard } from 'src/utils/guards/refresh.guard';
import { AccessGuard } from 'src/utils/guards/access.guard';

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

  @UseGuards(AccessGuard)
  @Post('logout')
  async logout(@Request() { user }: any) {
    return await this.authService.logout(user.id);
  }

  @UseGuards(RefreshGuard)
  @ApiBearerAuth()
  @Get('/refresh')
  async refresh(@Request() { user }: any) {
    return await this.authService.generateRefreshToken(user.id);
  }
}
