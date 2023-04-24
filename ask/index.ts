import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { saveToQueue } from "../src/queues/saveToQueue";
import { QueueName } from "../src/queues/QueueName";
import { isValidTelegramUpdate } from "../src/types/TelegramUpdate";
import { parseTelegramMessage } from "../src/telegram/parseTelegramMessage";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const update = req.body;
        if (!isValidTelegramUpdate(update)) {
            throw new Error(`Invalid Telegram update: ${JSON.stringify(update)}`);
        }
        const message = parseTelegramMessage(update);
        await saveToQueue(QueueName.IncomingTelegramMessages, message);
        context.log(`Added message to queue: ${JSON.stringify(message)}`);
    } catch (e) {
        context.log(`Error adding message to queue: ${e.message}}`);
        context.log(req.body);
    }

    // No matter what, return OK to Telegram to avoid retries:
    context.res = {
        body: 'OK'
    };
};

export default httpTrigger;