import {
  QueueSendMessageOptions,
  QueueSendMessageResponse,
  QueueServiceClient,
} from '@azure/storage-queue';
import { QueueName } from './QueueName';
import { encodeMessage } from './encodeMessage';
import { OutgoingQueueItem } from '../types/OutgoingQueueItem';
import { IncomingMessage } from '../types/IncomingMessage';

const DEFAULT_QUEUE_OPTIONS: QueueSendMessageOptions = {
  messageTimeToLive: 30 * 60, // 30 minutes
};

const queueServiceClient = QueueServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING,
);

export function saveToQueue(
  queue: QueueName,
  message: IncomingMessage | OutgoingQueueItem,
): Promise<QueueSendMessageResponse> {
  const queueClient = queueServiceClient.getQueueClient(queue);

  return queueClient.sendMessage(encodeMessage(message), DEFAULT_QUEUE_OPTIONS);
}
