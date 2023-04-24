import { HARD_MESSAGE_LIMIT } from "../constants";
import { IncomingMessage } from "../types/IncomingMessage";
import { TelegramUpdate } from "../types/TelegramUpdate";

export function parseTelegramMessage(update: TelegramUpdate): IncomingMessage {
    const message = update.message;
    if (!message) {
        throw new Error(`Invalid Telegram update - does not contain a message: ${JSON.stringify(update)}`);
    }

    if (!message.text) {
        throw new Error(`Invalid Telegram message - does not contain text: ${JSON.stringify(update)}`);
    }
    

    const msg: IncomingMessage = {
        messageId: message.message_id,
        chatId: message.chat.id,
        username: message.from.username,
        text: message.text.slice(0, HARD_MESSAGE_LIMIT),
    };

    return msg;
}
