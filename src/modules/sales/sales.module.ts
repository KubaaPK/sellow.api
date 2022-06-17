import { Module } from '@nestjs/common';

import { InfrastructureModule } from './infrastructure';

@Module({
  imports: [InfrastructureModule],
})
export class SalesModule {}
