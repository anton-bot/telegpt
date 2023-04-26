import { AzureFunction, Context } from '@azure/functions';
import { isIncomingMessage } from '../src/types/IncomingMessage';
import { extractCommand } from '../src/commands/extractCommand';
import { getOrCreateUser } from '../src/user/getOrCreateUser';
import { commands } from '../src/commands';
import { formatResponse } from '../src/telegram/formatResponse';
import { saveToQueue } from '../src/queues/saveToQueue';
import { QueueName } from '../src/queues/QueueName';
import { getSessionLogs, log, setLogger } from '../src/common/log';
import { getTableClient } from '../src/common/getTableClient';
import { Table } from '../src/types/Table';

const queueTrigger: AzureFunction = async function (
  context: Context,
  message: unknown,
): Promise<void> {
  try {
    setLogger(context.log);

    if (!isIncomingMessage(message)) {
      throw new Error('Invalid message - cannot be parsed as IncomingMessage');
    }

    const parsed = extractCommand(message.text);
    const client = getTableClient(Table.Users);
    const { etag, user } = await getOrCreateUser(client, message.chatId, message.username);
    const process = commands[parsed.command];
    const result = await process(message, user, parsed, etag);
    await saveToQueue(QueueName.OutgoingTelegramMessages, {
      response: formatResponse(message, result),
      botMessage: result.botMessage,
      debug: getSessionLogs(),
    });
  } catch (e) {
    log(`Error processing queue item: ${e?.message} ${JSON.stringify(message)}`);
    throw e;
  }
};

export default queueTrigger;
