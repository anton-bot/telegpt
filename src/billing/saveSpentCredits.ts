import { TableClient } from '@azure/data-tables';
import { User } from '../types/User';
import { updateUser } from '../user/updateUser';

export function saveSpentCredits(
  client: TableClient,
  user: User,
  spentCredits: number,
  etag: string,
) {
  return updateUser(client, user, etag, (user) => ({
    ...user,
    credits: user.credits - spentCredits,
  }));
}
