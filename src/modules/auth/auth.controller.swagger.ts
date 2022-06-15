import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

const createUser = applyDecorators(
  ApiOperation({ summary: 'Create a new user.', tags: ['Auth'] }),
  ApiResponse({
    status: 201,
    description: 'User has been successfully created.',
  }),
  ApiResponse({ status: 400, description: 'Request body validation failed.' }),
  ApiResponse({
    status: 409,
    description: 'User with given credentials already exists.',
  }),
  ApiResponse({ status: 500, description: 'Internal server error.' }),
);

const activateUser = applyDecorators(
  ApiOperation({ summary: 'Activate a user.', tags: ['Auth'] }),
  ApiResponse({ status: 200, description: 'User has been activated.' }),
  ApiResponse({
    status: 422,
    description:
      'User cannot be activated. Has not been found or is already activated.',
  }),
  ApiResponse({ status: 500, description: 'Internal server error.' }),
);

export { createUser, activateUser };
