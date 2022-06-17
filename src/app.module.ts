import { Module } from '@nestjs/common';

import { DatabaseModule } from '@shared/infrastructure/database';
import { ConfigurationModule } from './configuration';
import { AuthModule } from './modules/auth';
import { EmailSendingModule } from './modules/email-sending';
import { SalesModule } from './modules/sales';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    AuthModule,
    EmailSendingModule,
    SalesModule,
  ],
})
export class AppModule {}
