import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { ActivateUserHandler } from './activate-user';

import { CreateUserHandler } from './create-user';

export const features: Type<ICommandHandler>[] = [
  CreateUserHandler,
  ActivateUserHandler,
];
