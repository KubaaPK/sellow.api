import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';

import * as swagger from './auth.controller.swagger';
import { ActivateUser } from './features/activate-user';
import { CreateUser, CreateUserRequest } from './features/create-user';

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

  @swagger.activateUser
  @Get('auth/activate-user/:id')
  public async activateUser(
    @Res() response: Response,
    @Param('id') id: string,
  ): Promise<void> {
    await this._commandBus.execute(new ActivateUser(id));

    response.sendStatus(200);
  }
}
