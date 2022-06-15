import { IEvent } from '@nestjs/cqrs';

export class UserCreated implements IEvent {
  constructor(
    public readonly createdUser: Readonly<{
      id: string;
      email: string;
      username: string;
    }>,
  ) {}
}
