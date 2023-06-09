import { TelegramCallbackQuery } from './TelegramUpdate';

export type IncomingMessage = {
  messageId: number | string;
  chatId: number;
  username: string;
  text: string;
  replyTo?: number;
  callbackQuery?: TelegramCallbackQuery;
};

export function isIncomingMessage(obj: unknown): obj is IncomingMessage {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  return (
    obj &&
    'messageId' in obj &&
    'chatId' in obj &&
    'username' in obj &&
    'text' in obj &&
    typeof (obj as IncomingMessage).chatId === 'number' &&
    typeof (obj as IncomingMessage).username === 'string' &&
    typeof (obj as IncomingMessage).text === 'string'
  );
}
