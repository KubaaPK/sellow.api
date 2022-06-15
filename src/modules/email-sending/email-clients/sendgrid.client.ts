import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sendgrid from '@sendgrid/mail';

import { SendgridOptions } from './sendgrid.options';

@Injectable()
export class SendgridClient {
  private readonly _logger = new Logger(SendgridClient.name);

  constructor(private readonly _configService: ConfigService) {
    const options =
      this._configService.get<SendgridOptions>('mailing.sendgrid');

    sendgrid.setApiKey(options.apiKey);
  }

  public async send(email: sendgrid.MailDataRequired): Promise<void> {
    await sendgrid.send(email);

    this._logger.log(`Email '${JSON.stringify(email)}' has been sent.`);
  }
}
