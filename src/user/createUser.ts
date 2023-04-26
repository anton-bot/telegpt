import { DEFAULT_GPT_MODEL, DEFAULT_CREDITS } from '../constants';
import { User } from '../types/User';
import { getUserPartitionKey } from './getUserPartitionKey';
import { TableClient } from '@azure/data-tables';

export async function createUser(client: TableClient, chatId: number, username: string) {
  if (!Number.isFinite(chatId)) {
    throw new Error(`Invalid chat ID ${chatId} when creating new user ${username}`);
  }

  const newUser: User = {
    partitionKey: getUserPartitionKey(chatId),
    rowKey: chatId.toString(),
    timestamp: Date.now(),
    username: username,
    gptModel: DEFAULT_GPT_MODEL,
    credits: DEFAULT_CREDITS,
    updatedAt: Date.now(),
    isAdmin: false,
  };

  const { etag } = await client.createEntity(newUser);
  return { etag, user: newUser };
}
