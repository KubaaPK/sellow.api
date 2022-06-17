import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { auth } from 'firebase-admin';
import { Strategy } from 'passport-http-bearer';

@Injectable()
export class FirebaseJwtStrategy extends PassportStrategy(Strategy) {
  private readonly _logger = new Logger(FirebaseJwtStrategy.name);

  constructor() {
    super();
  }

  public async validate(token: string): Promise<auth.DecodedIdToken> {
    return auth()
      .verifyIdToken(token)
      .then((res) => res)
      .catch((error) => {
        this._logger.error(error);
        throw new UnauthorizedException();
      });
  }
}
