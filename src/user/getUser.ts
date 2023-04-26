import { TableClient } from '@azure/data-tables';
import { User } from '../types/User';
import { getUserPartitionKey } from './getUserPartitionKey';

export type UserWithEtag = {
  etag: string;
  user: User | undefined;
};

export async function getUser(
  client: TableClient,
  chatId: number,
): Promise<UserWithEtag | undefined> {
  const partitionKey = getUserPartitionKey(chatId);

  try {
    const { etag, ...user } = await client.getEntity<User>(partitionKey, chatId.toString());
    return { etag, user };
  } catch (e) {
    return {
      etag: '',
      user: undefined,
    };
  }
}
