import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserActivated } from '../../../auth/integration-events';
import { UserEntity } from '../dal';

@EventsHandler(UserActivated)
export class CreateUser implements IEventHandler<UserActivated> {
  private readonly _logger = new Logger(CreateUser.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  public async handle(event: UserActivated): Promise<void> {
    await this._userRepository.save({ ...event.createdUser });

    this._logger.log(
      `User '${event.createdUser.id}' has been created in Sales context.`,
    );
  }
}
