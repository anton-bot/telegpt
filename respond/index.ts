import { AzureFunction, Context } from "@azure/functions"
import { sendTelegramMessage } from "../src/telegram/sendTelegramMessage";
import { isOutgoingQueueItem } from "../src/types/OutgoingQueueItem";
import { saveMessage } from "../src/history/saveMessage";
import { getTableClient } from "../src/common/getTableClient";
import { Table } from "../src/types/Table";
import { log, setLogger } from "../src/common/log";

const queueTrigger: AzureFunction = async function (context: Context, queueItem: unknown): Promise<void> {
    try {
        setLogger(context.log);
        if (!isOutgoingQueueItem(queueItem)) {
            throw new Error(`Invalid message - cannot be parsed as OutgoingMessage`);
        }

        const { response, botMessage } = queueItem;

        const sentMessage = await sendTelegramMessage(process.env.TELEGRAM_TOKEN, response.chatId, response.text, response.replyTo);
        botMessage.rowKey = sentMessage.result.message_id.toString();

        const client = getTableClient(Table.History);
        await saveMessage(client, botMessage);
    } catch (e) {
        log(`Error processing outgoing queue item: ${e?.message} ${JSON.stringify(queueItem)}`);
    }
};

export default queueTrigger;