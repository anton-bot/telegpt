import {
  QueueSendMessageOptions,
  QueueSendMessageResponse,
  QueueServiceClient,
} from '@azure/storage-queue';
import { QueueName } from './QueueName';
import { Message } from '../types/Message';
import { encodeMessage } from './encodeMessage';

const DEFAULT_QUEUE_OPTIONS: QueueSendMessageOptions = {
  messageTimeToLive: 30 * 60, // 30 minutes
};

const queueServiceClient = QueueServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING,
);

export function saveToQueue(queue: QueueName, message: object): Promise<QueueSendMessageResponse> {
  const queueClient = queueServiceClient.getQueueClient(queue);

  return queueClient.sendMessage(encodeMessage(message), DEFAULT_QUEUE_OPTIONS);
}
