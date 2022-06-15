import { Module } from '@nestjs/common';

import { DatabaseModule } from '@shared/infrastructure/database';
import { ConfigurationModule } from './configuration';
import { AuthModule } from './modules/auth';
import { EmailSendingModule } from './modules/email-sending';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    AuthModule,
    EmailSendingModule,
  ],
})
export class AppModule {}
