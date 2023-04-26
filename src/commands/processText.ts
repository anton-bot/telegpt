import { getChatCompletion } from '../api/getChatCompletion';
import { calculateSpentCredits } from '../billing/calculateSpentCredits';
import { countTokens } from '../common/countTokens';
import { getTableClient } from '../common/getTableClient';
import { getMessageHistory } from '../history/getMessageHistory';
import { createHistory } from '../history/createHistory';
import { CommandProcessor } from '../types/CommandProcessor';
import { HistoryMessage } from '../types/HistoryMessage';
import { getTokenLimit } from '../types/Model';
import { OpenAiMessage } from '../types/OpenAiMessage';
import { Table } from '../types/Table';
import { saveMessage } from '../history/saveMessage';
import { saveSpentCredits } from '../billing/saveSpentCredits';

export const processText: CommandProcessor = async (message, account, command, etag) => {
  if (account.credits <= 0) {
    return {
      responseText:
        'You have no credits left. Please purchase more credits to continue using this service.',
    };
  }

  const model = account.gptModel;
  const client = getTableClient(Table.History);
  const isFirstMessageInThread = !message.replyTo;
  const history = isFirstMessageInThread
    ? []
    : await getMessageHistory(client, message.chatId, message.replyTo);

  const totalTokens = countTokens(history) + countTokens(message.text);
  const isOverTokenLimit = totalTokens >= getTokenLimit(model);
  const prevMessages = isOverTokenLimit
    ? []
    : history.sort(byTimestampAscending).map(toOpenAiHistoryFormat);

  const { responseText, promptTokens, responseTokens } = await getChatCompletion(
    model,
    message.text,
    prevMessages,
  );

  const [promptCredits, responseCredits] = [
    calculateSpentCredits(model, promptTokens, 'in'),
    calculateSpentCredits(model, responseTokens, 'out'),
  ];

  const threadId =
    isOverTokenLimit || isFirstMessageInThread ? message.messageId : history[0]?.threadId ?? -1;

  const { userMessage, botMessage } = createHistory({
    message,
    threadId,
    promptTokens,
    responseTokens,
    promptCredits,
    responseCredits,
    responseText,
  });

  await Promise.all([
    saveMessage(client, userMessage),
    saveSpentCredits(getTableClient(Table.Users), account, promptCredits + responseCredits, etag),
  ]);

  return {
    responseText,
    botMessage,
  };
};

const byTimestampAscending = (a: HistoryMessage, b: HistoryMessage) => a.timestamp - b.timestamp;

const toOpenAiHistoryFormat = (message: HistoryMessage): OpenAiMessage => ({
  role: message.role,
  content: message.text,
});
