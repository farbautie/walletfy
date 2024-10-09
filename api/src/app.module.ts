import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './settings/validator';
import { LoggerModule } from './settings/logger';
import { JwtModule } from '@nestjs/jwt';
import { AccessStrategy, RefeshStrategy } from './utils/strategies';
import { GuardsModule } from './utils/guards';
import { PrismaModule } from './prisma/prisma.module';
import { ExceptionsModule } from './settings/exceptions';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    JwtModule.register({
      global: true,
    }),
    PrismaModule,
    LoggerModule,
    ExceptionsModule,
    AuthModule,
    GuardsModule,
  ],
  controllers: [],
  providers: [AccessStrategy, RefeshStrategy],
})
export class AppModule {}
