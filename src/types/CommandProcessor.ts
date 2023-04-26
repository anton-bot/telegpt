import { User } from './User';
import { IncomingMessage } from './IncomingMessage';
import { ParsedCommand } from './ParsedCommand';
import { HistoryMessage } from './HistoryMessage';
import { TelegramInlineKeyboardButton } from './TelegramUpdate';

export type CommandProcessorResult = {
  responseText: string;
  botMessage?: HistoryMessage;
  answerCallbackQuery?: string;
  inlineButtons?: TelegramInlineKeyboardButton[][];
};

export type CommandProcessor = (
  message: IncomingMessage,
  user: User,
  command: ParsedCommand,
) => Promise<CommandProcessorResult>;
