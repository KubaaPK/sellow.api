import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestUtilsModule, TestUtilsService } from '../../../utils/test-utils';
import { UserEntity } from '../entities';
import { CreateUser, CreateUserHandler } from './create-user';

describe('CreateUserHandler', () => {
  let testUtils: TestUtilsService;
  let handler: CreateUserHandler;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TestUtilsModule, TypeOrmModule.forFeature([UserEntity])],
      providers: [TestUtilsService, CreateUserHandler],
    }).compile();

    testUtils = module.get(TestUtilsService);
    handler = module.get(CreateUserHandler);

    await testUtils.reconnect();
  });

  afterEach(async () => await testUtils.clearDatabase());

  it('should CreateUserHandler be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should throw ConflictException if user already exists', async () => {
    // Arrange
    await testUtils.insert<UserEntity>(UserEntity, [
      { email: 'johndoe22@email.com', username: 'johndoe22' },
    ]);

    // Act & Assert
    const command = new CreateUser({
      email: 'johndoe22@email.com',
      username: 'johndoe22',
      password: 'johndoe21',
    });

    expect(handler.execute(command)).rejects.toThrowError(ConflictException);
  });

  it('should add a user to the database', async () => {
    // Act
    const command = new CreateUser({
      email: 'johndoe22@email.com',
      username: 'johndoe22',
      password: 'johndoe21',
    });
    await handler.execute(command);

    // Assert
    const result = await testUtils.query(`SELECT COUNT(*) FROM "auth"."users"`);
    expect(result[0].count).toBe('1');
  });
});
