import { TableClient, odata } from '@azure/data-tables';
import { HistoryMessage } from '../types/HistoryMessage';
import { log } from '../common/log';

export async function getMessagesByThreadId(
  client: TableClient,
  chatId: number,
  threadId: number | string,
) {
  const query = odata`PartitionKey eq '${chatId}' and threadId eq ${threadId}`;
  const messagesIterator = client.listEntities<HistoryMessage>({
    queryOptions: { filter: query },
  });

  const messages: HistoryMessage[] = [];
  for await (const message of messagesIterator) {
    messages.push(message);
  }

  log(`Retrieved ${messages.length} messages for chat ${chatId} and thread ${threadId}`);
  return messages;
}
