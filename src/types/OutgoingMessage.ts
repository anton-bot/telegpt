import { TelegramInlineKeyboardButton } from './TelegramUpdate';

export type OutgoingMessage = {
  chatId: number;
  replyTo: number | string | undefined;
  text: string;
  answerCallbackQuery?: string;
  inlineButtons?: TelegramInlineKeyboardButton[][];
};

export function isOutgoingMessage(obj: unknown): obj is OutgoingMessage {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  return (
    'chatId' in obj &&
    'text' in obj &&
    typeof obj.chatId === 'number' &&
    typeof obj.text === 'string'
  );
}
