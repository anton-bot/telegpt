import { TableClient } from "@azure/data-tables";
import { HistoryMessage } from "../types/HistoryMessage";

export function getMessageById(client: TableClient, chatId: number, messageId: number): Promise<HistoryMessage | undefined>{
    const partitionKey = chatId.toString();
    const rowKey = messageId.toString();
    return client.getEntity(partitionKey, rowKey);
}
