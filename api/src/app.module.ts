import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { validationSchema } from './settings/validator';
import { LoggerService } from './settings/logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [LoggerService, PrismaService],
})
export class AppModule {}
