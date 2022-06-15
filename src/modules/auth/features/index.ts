import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

import { CreateUserHandler } from './create-user';

export const features: Type<ICommandHandler>[] = [CreateUserHandler];
