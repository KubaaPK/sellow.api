import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { entities } from './dal';
import { integrationEventHandlers } from './integration-events-handlers';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([...entities])],
  providers: [...integrationEventHandlers],
})
export class InfrastructureModule {}
