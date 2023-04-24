import { QueueSendMessageOptions, QueueSendMessageResponse, QueueServiceClient } from '@azure/storage-queue';
import { QueueName } from './QueueName';
import { Message } from '../types/Message';

const DEFAULT_QUEUE_OPTIONS: QueueSendMessageOptions = {
    visibilityTimeout: 3 * 60, // 3 minutes
    messageTimeToLive: 30 * 60, // 30 minutes
};

const queueServiceClient = QueueServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);

export async function saveToQueue(queue: QueueName, message: Message): Promise<QueueSendMessageResponse> {
    const queueClient = queueServiceClient.getQueueClient(queue);

    return queueClient.sendMessage(
        JSON.stringify(message),
        DEFAULT_QUEUE_OPTIONS,
    );
}
