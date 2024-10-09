import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { validationSchema } from './settings/validator';
import { LoggerService } from './settings/logger';
import { JwtModule } from '@nestjs/jwt';
import { AccessStrategy, RefeshStrategy } from './utils/strategies';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    JwtModule.register({
      global: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [LoggerService, PrismaService, AccessStrategy, RefeshStrategy],
})
export class AppModule {}
