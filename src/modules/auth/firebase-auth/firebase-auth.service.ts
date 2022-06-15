import { Injectable, Logger } from '@nestjs/common';
import { auth } from 'firebase-admin';

@Injectable()
export class FirebaseAuthService {
  private readonly _logger = new Logger(FirebaseAuthService.name);

  public async createUser(
    user: Readonly<{
      id: string;
      email: string;
      username: string;
      password: string;
    }>,
  ): Promise<void> {
    const { email, id, password, username } = user;

    await auth().createUser({
      email,
      password,
      uid: id,
      displayName: username,
      emailVerified: false,
      disabled: true,
    });

    this._logger.log(`Firebase user '${id}' has been created.`);
  }
}
