import { ConfigService } from '@nestjs/config';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MailDataRequired } from '@sendgrid/mail';

import { UserCreated } from '../../auth/integration-events';
import { SendgridClient } from '../email-clients';

@EventsHandler(UserCreated)
export class SendUserActivationEmail implements IEventHandler<UserCreated> {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _sendgridClient: SendgridClient,
  ) {}

  public async handle(event: UserCreated) {
    const email = this.createEmail(event);

    await this._sendgridClient.send(email);
  }

  private createEmail(event: UserCreated): MailDataRequired {
    const { email, id, username } = event.createdUser;

    return {
      from: 'sellow@sellow.io',
      to: email,
      templateId: this._configService.get<string>(
        'mailing.sendgrid.templates.userActivation',
      ),
      dynamicTemplateData: {
        Username: username,
        ActivationLink: `${this._configService.get<string>(
          'auth.userActivationUrl',
        )}/${id}`,
      },
    };
  }
}
