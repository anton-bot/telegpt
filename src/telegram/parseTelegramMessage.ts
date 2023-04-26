import { HARD_MESSAGE_LIMIT } from '../constants';
import { IncomingMessage } from '../types/IncomingMessage';
import { TelegramUpdate } from '../types/TelegramUpdate';

export function parseTelegramMessage(update: TelegramUpdate): IncomingMessage {
  const { message, callback_query: callbackQuery } = update;
  if (!message && !callbackQuery) {
    throw new Error(
      `Invalid Telegram update - does not contain a message: ${JSON.stringify(update)}`,
    );
  }

  if (!message?.text && !callbackQuery?.data) {
    throw new Error(`Invalid Telegram message - does not contain text: ${JSON.stringify(update)}`);
  }

  if (message) {
    return {
      messageId: message.message_id,
      chatId: message.chat.id,
      username: message.from.username,
      text: message.text.slice(0, HARD_MESSAGE_LIMIT),
      replyTo: message.reply_to_message?.message_id,
    };
  }

  if (callbackQuery) {
    if (!callbackQuery.message) {
      // Message will be missing if it was sent a long time ago:
      throw new Error(
        `Invalid Telegram callback query - does not contain a message: ${JSON.stringify(update)}`,
      );
    }

    return {
      messageId: callbackQuery.id,
      chatId: callbackQuery.message.chat.id,
      username: '',
      text: callbackQuery?.data ?? '',
      callbackQuery, // TODO FIXME: just send the ID of the callback query
    };
  }
}
