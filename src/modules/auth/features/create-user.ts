import { ConflictException, Logger } from '@nestjs/common';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities';
import { FirebaseAuthService } from '../firebase-auth';

export class CreateUserRequest {
  @ApiProperty({ required: true })
  public readonly email: string;

  @ApiProperty({ required: true })
  public readonly username: string;

  @ApiProperty({ required: true, minLength: 6 })
  public readonly password: string;
}

export class CreateUser implements ICommand {
  constructor(public readonly request: Readonly<CreateUserRequest>) {}
}

@CommandHandler(CreateUser)
export class CreateUserHandler implements ICommandHandler<CreateUser> {
  private readonly _logger = new Logger(CreateUserHandler.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
    private readonly _firebaseAuthService: FirebaseAuthService,
  ) {}

  public async execute(command: CreateUser): Promise<any> {
    const { email, username, password } = command.request;

    const isUserUnique =
      (await this._userRepository.findOne({
        where: [{ email }, { username }],
      })) === null;

    if (!isUserUnique) {
      throw new ConflictException(
        'User with given credentials already exists.',
      );
    }

    const createdUser = await this._userRepository.save({ email, username });

    this._logger.log(`User '${createdUser.id}' has been saved to database.`);

    await this._firebaseAuthService.createUser({
      id: createdUser.id,
      email,
      password,
      username,
    });
  }
}
