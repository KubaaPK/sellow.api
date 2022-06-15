import { Type } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';

import { SendUserActivationEmail } from './send-user-activation-email';

export const features: Type<IEventHandler>[] = [SendUserActivationEmail];
