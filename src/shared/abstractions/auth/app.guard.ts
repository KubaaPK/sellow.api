import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

class _AppGuard extends AuthGuard('bearer') {}

export const AppGuard = applyDecorators(UseGuards(_AppGuard));
