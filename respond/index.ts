import { AzureFunction, Context } from '@azure/functions';
import { sendTelegramMessage } from '../src/telegram/sendTelegramMessage';
import { isOutgoingQueueItem } from '../src/types/OutgoingQueueItem';
import { saveMessage } from '../src/history/saveMessage';
import { getTableClient } from '../src/common/getTableClient';
import { Table } from '../src/types/Table';
import { getSessionLogs, log, setLogger } from '../src/common/log';
import { ENABLE_DEBUG_LOGGING } from '../src/constants';
import { answerCallbackQuery } from '../src/telegram/answerCallbackQuery';
import { getTelegramToken } from '../src/telegram/getTelegramToken';

const queueTrigger: AzureFunction = async function (
  context: Context,
  queueItem: unknown,
): Promise<void> {
  try {
    setLogger(context.log);
    if (!isOutgoingQueueItem(queueItem)) {
      throw new Error(`Invalid message - cannot be parsed as OutgoingMessage`);
    }

    const { response, botMessage } = queueItem;

    const telegramToken = getTelegramToken(response.chatId);

    if (response.answerCallbackQuery) {
      await answerCallbackQuery(telegramToken, response.answerCallbackQuery);
    }

    const sentMessage = await sendTelegramMessage(
      telegramToken,
      response.chatId,
      response.text,
      response.replyTo,
      response.inlineButtons,
    );

    if (botMessage) {
      botMessage.rowKey = sentMessage.result.message_id.toString();

      const client = getTableClient(Table.History);
      await saveMessage(client, botMessage);
    }
  } catch (e) {
    log(`Error processing outgoing queue item: ${e?.message} ${JSON.stringify(queueItem)}`);
  } finally {
    if (ENABLE_DEBUG_LOGGING) {
      const { response, debug } = queueItem as any;
      const logs = (debug ?? '') + getSessionLogs();
      if (logs.trim() && response?.chatId) {
        await sendTelegramMessage(getTelegramToken(), response.chatId, 'Logs: \n\n' + logs);
      }
    }
  }
};

export default queueTrigger;
