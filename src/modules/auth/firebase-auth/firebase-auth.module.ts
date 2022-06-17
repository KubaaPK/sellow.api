import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as firebaseAdmin from 'firebase-admin';

import { FirebaseAuthOptions } from './firebase-auth.options';
import { FirebaseAuthService } from './firebase-auth.service';
import { FirebaseJwtStrategy } from './firebase-jwt.strategy';

@Module({
  providers: [FirebaseAuthService, FirebaseJwtStrategy],
  exports: [FirebaseAuthService],
})
export class FirebaseAuthModule {
  private readonly _logger = new Logger(FirebaseAuthModule.name);

  constructor(private readonly _configService: ConfigService) {
    const options =
      this._configService.get<FirebaseAuthOptions>('auth.firebase');

    firebaseAdmin.initializeApp({
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      credential: firebaseAdmin.credential.cert(require(options.secret)),
      projectId: options.projectId,
    });

    this._logger.log('Firebase admin has been initialized.');
  }
}
