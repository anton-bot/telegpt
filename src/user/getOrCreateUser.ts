import { TableClient } from '@azure/data-tables';
import { createUser } from './createUser';
import { UserWithEtag, getUser } from './getUser';

export async function getOrCreateUser(
  client: TableClient,
  chatId: number,
  username: string | undefined,
): Promise<UserWithEtag> {
  if (!Number.isFinite(chatId)) {
    throw new Error(`Invalid chat ID ${chatId} when getting/creating new user ${username}`);
  }

  const { etag, user } = await getUser(client, chatId);
  if (user) {
    return { etag, user };
  }

  return createUser(client, chatId, username);
}
