import { AzureFunction, Context } from "@azure/functions"
import { isIncomingMessage } from "../src/types/IncomingMessage";
import { extractCommand } from "../src/commands/extractCommand";
import { getOrCreateUser } from "../src/user/getOrCreateUser";
import { commands } from "../src/commands";
import { formatResponse } from "../src/telegram/formatResponse";
import { saveToQueue } from "../src/queues/saveToQueue";
import { QueueName } from "../src/queues/QueueName";
import { getSessionLogs, setLogger } from "../src/common/log";

const queueTrigger: AzureFunction = async function (context: Context, message: unknown): Promise<void> {
    try {
        if (!isIncomingMessage(message)) {
            throw new Error("Invalid message - cannot be parsed as IncomingMessage");
        }
        
        setLogger(context.log);

        const parsed = extractCommand(message.text);
        const user = await getOrCreateUser(message.chatId, message.username);
        const process = commands[parsed.command];
        const result = await process(message, user, parsed);
        result.responseText = getSessionLogs() + result.responseText;
        await saveToQueue(QueueName.OutgoingTelegramMessages, {
            response: formatResponse(message, result),
            botMessage: result.botMessage,
        });
    } catch (e) {
        context.log(`Error processing queue item: ${e?.message} ${JSON.stringify(message)}`);
        throw e;
    }
};

export default queueTrigger;
