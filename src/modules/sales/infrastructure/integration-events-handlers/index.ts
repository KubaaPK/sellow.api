import { Type } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';

import { CreateUser } from './create-user';

export const integrationEventHandlers: Type<IEventHandler>[] = [CreateUser];
