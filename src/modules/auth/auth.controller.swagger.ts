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

export { createUser };
