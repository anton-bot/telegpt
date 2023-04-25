import { TableClient } from "@azure/data-tables";
import { HistoryMessage } from "../types/HistoryMessage";
import { getMessageById } from "./getMessageById";
import { getMessagesByThreadId } from "./getMessagesByThreadId";
import { log } from "../common/log";

export async function getMessageHistory(client: TableClient, chatId: number, replyTo: number): Promise<HistoryMessage[]> {
    try {
        const prevMessage = await getMessageById(client, chatId, replyTo);

        log(`Retrieved previous message: ${JSON.stringify(prevMessage)}`);

        if (!prevMessage) {
            throw new Error(`Unexpected error: No message found with chat ID ${chatId} and replyTo ${replyTo}`);
        }

        return await getMessagesByThreadId(client, chatId, prevMessage.threadId);
    } catch (e) {
        log(e.message);
        log(`Error retrieving message history for chat ID ${chatId} and replyTo ${replyTo}`);
        return [];
    }
}
