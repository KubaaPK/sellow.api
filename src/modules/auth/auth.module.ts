import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { entities } from './entities';
import { features } from './features';
import { FirebaseAuthModule } from './firebase-auth';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([...entities]),
    FirebaseAuthModule,
  ],
  providers: [...features],
  controllers: [AuthController],
})
export class AuthModule {}
