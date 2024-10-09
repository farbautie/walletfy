import { Global, Module } from '@nestjs/common';
import { GuardsService } from './guards.service';

@Global()
@Module({
  imports: [],
  providers: [GuardsService],
  exports: [GuardsService],
})
export class GuardsModule {}
