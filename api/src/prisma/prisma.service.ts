import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoggerService } from 'src/settings/logger';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly loggerService: LoggerService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.loggerService.log(`DATABASE`, `Connected to database`);
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.loggerService.log(`DATABASE`, `Disconnected from database`);
  }
}
