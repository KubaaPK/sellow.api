import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';

import { FirebaseAuthService } from '../firebase-auth';
import { UserActivated } from '../integration-events';

export class ActivateUser implements ICommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(ActivateUser)
export class ActivateUserHandler implements ICommandHandler<ActivateUser> {
  constructor(
    private readonly _eventBus: EventBus,
    private readonly _firebaseAuthService: FirebaseAuthService,
  ) {}

  public async execute(command: ActivateUser): Promise<any> {
    const { id } = command;

    const activatedUser = await this._firebaseAuthService.activateUser(id);

    this._eventBus.publish(
      new UserActivated({
        id,
        email: activatedUser.email,
        username: activatedUser.displayName,
      }),
    );
  }
}
