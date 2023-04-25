import { HistoryMessage, isHistoryMessage } from './HistoryMessage';
import { OutgoingMessage, isOutgoingMessage } from './OutgoingMessage';

export type OutgoingQueueItem = {
  response: OutgoingMessage;
  botMessage: HistoryMessage;
  debug?: string;
};

export function isOutgoingQueueItem(obj: unknown): obj is OutgoingQueueItem {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  return (
    'response' in obj &&
    isOutgoingMessage(obj.response) &&
    ('botMessage' in obj ? isHistoryMessage(obj.botMessage) : true)
  );
}
