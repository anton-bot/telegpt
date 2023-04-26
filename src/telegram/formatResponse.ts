import { CommandProcessorResult } from '../types/CommandProcessor';
import { IncomingMessage } from '../types/IncomingMessage';
import { OutgoingMessage } from '../types/OutgoingMessage';

export function formatResponse(
  message: IncomingMessage,
  result: CommandProcessorResult,
): OutgoingMessage {
  return {
    chatId: message.chatId,
    replyTo: result.answerCallbackQuery ? undefined : message.messageId,
    text: result.responseText,
    answerCallbackQuery: result.answerCallbackQuery,
    inlineButtons: result.inlineButtons,
  };
}
