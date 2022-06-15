import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { auth, FirebaseError } from 'firebase-admin';

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

  public async activateUser(id: string): Promise<auth.UserRecord> {
    let firebaseUser: auth.UserRecord;

    try {
      firebaseUser = await auth().getUser(id);
    } catch (error) {
      this._logger.error(error);

      if ((error as FirebaseError).code === 'auth/user-not-found') {
        throw new UnprocessableEntityException(
          'User not found or is already activated.',
        );
      }
    }

    if (firebaseUser.emailVerified) {
      this._logger.error(`Firebase user ${id} is already activated.`);

      throw new UnprocessableEntityException(
        'User not found or is already activated.',
      );
    }

    await auth().updateUser(id, {
      emailVerified: true,
      disabled: false,
    });

    this._logger.log(`Firebase user '${id}' has been activated.`);

    return firebaseUser;
  }
}
