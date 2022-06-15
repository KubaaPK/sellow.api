import { Module } from '@nestjs/common';

import { DatabaseModule } from '@shared/infrastructure/database';
import { ConfigurationModule } from './configuration';
import { AuthModule } from './modules/auth';

@Module({
  imports: [ConfigurationModule, DatabaseModule, AuthModule],
})
export class AppModule {}
