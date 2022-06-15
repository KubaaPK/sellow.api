import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { emailClients } from './email-clients';
import { features } from './features';

@Module({
  imports: [CqrsModule],
  providers: [...features, ...emailClients],
})
export class EmailSendingModule {}
