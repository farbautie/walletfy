import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerService } from 'src/settings/logger';
import { ExceptionsModule } from 'src/settings/exceptions';

@Module({
  controllers: [AuthController],
  imports: [ExceptionsModule],
  providers: [LoggerService, PrismaService, AuthService],
})
export class AuthModule { }
