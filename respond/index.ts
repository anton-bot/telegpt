import { AzureFunction, Context } from "@azure/functions"
import { isOutgoingMessage } from "../src/types/OutgoingMessage";
import { sendTelegramMessage } from "../src/telegram/sendTelegramMessage";

const queueTrigger: AzureFunction = async function (context: Context, message: unknown): Promise<void> {
    try {
        if (!isOutgoingMessage(message)) {
            throw new Error(`Invalid message - cannot be parsed as OutgoingMessage: ${message}`);
        }

        await sendTelegramMessage(process.env.TELEGRAM_TOKEN, message.chatId, message.text, message.replyTo);
    } catch (e) {
        context.log(`Error processing outgoing queue item: ${e?.message} ${JSON.stringify(message)}`);
    }
};

export default queueTrigger;
