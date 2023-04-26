import { IncomingMessage } from '../types/IncomingMessage';
import { MessageRole } from '../types/MessageRole';

type HistoryData = {
  message: IncomingMessage;
  threadId: number | string;
  promptTokens: number;
  responseTokens: number;
  promptCredits: number;
  responseCredits: number;
  responseText: string;
};

export function createHistory(data: HistoryData) {
  const {
    message,
    threadId,
    promptTokens,
    responseTokens,
    promptCredits,
    responseCredits,
    responseText,
  } = data;
  const now = Date.now();

  return {
    userMessage: {
      partitionKey: message.chatId.toString(),
      rowKey: message.messageId.toString(),
      chatId: message.chatId,
      threadId,
      timestamp: now - 1, // for sorting, user's message has to be earlier
      role: MessageRole.User,
      text: message.text,
      tokens: promptTokens,
      spentCredits: promptCredits,
    },
    botMessage: {
      partitionKey: message.chatId.toString(),

      // this is temporary and will be replaced with the actual Telegram message id
      rowKey: `${message.messageId.toString()}-response-${now}`,

      chatId: message.chatId,
      threadId,
      timestamp: now,
      role: MessageRole.Assistant,
      text: responseText,
      tokens: responseTokens,
      spentCredits: responseCredits,
    },
  };
}
