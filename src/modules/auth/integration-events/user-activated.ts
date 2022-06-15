import { IEvent } from '@nestjs/cqrs';

export class UserActivated implements IEvent {
  constructor(
    public readonly createdUser: Readonly<{
      id: string;
      email: string;
      username: string;
    }>,
  ) {}
}
