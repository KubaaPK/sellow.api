import { Body, Controller, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';

import { CreateUser, CreateUserRequest } from './features/create-user';
import * as swagger from './auth.controller.swagger';

@Controller({
  version: '1',
})
export class AuthController {
  constructor(private readonly _commandBus: CommandBus) {}

  @swagger.createUser
  @Post('users')
  public async createUser(
    @Res() response: Response,
    @Body() request: CreateUserRequest,
  ): Promise<void> {
    await this._commandBus.execute(new CreateUser(request));

    response.sendStatus(201);
  }
}
