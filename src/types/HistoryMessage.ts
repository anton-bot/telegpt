import { threadId } from 'worker_threads';
import { MessageRole } from './MessageRole';
import { TableRow } from './TableRow';

export type HistoryMessage = TableRow & {
  chatId: number;
  replyTo?: number;

  // Telegram does not provide a unique ID for threads, so we have to make our own.
  // The threadId is the ID of the first message in the thread.
  threadId: number | string;

  text: string;
  tokens: number;
  spentCredits: number;
  role: MessageRole;
};

export function isHistoryMessage(o: unknown): o is HistoryMessage {
  if (typeof o !== 'object' || o === null) {
    return false;
  }

  return (
    'chatId' in o &&
    'threadId' in o &&
    'text' in o &&
    'tokens' in o &&
    'spentCredits' in o &&
    'role' in o
  );
}
