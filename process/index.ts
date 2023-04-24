import { AzureFunction, Context } from "@azure/functions"
import { isIncomingMessage } from "../src/types/IncomingMessage";
import { extractCommand } from "../src/commands/extractCommand";
import { getOrCreateUser } from "../src/user/getOrCreateUser";
import { decodeMessage } from "../src/queues/encodeMessage";

const queueTrigger: AzureFunction = async function (context: Context, message: object): Promise<void> {
    try {
        if (!isIncomingMessage(message)) {
            throw new Error("Invalid message - cannot be parsed as IncomingMessage");
        }

        const command = extractCommand(message.text);
        const user = await getOrCreateUser(message.chatId, message.username);

        context.log(`User ${user.username} (${user.rowKey}) sent command ${command.command} with credits ${user.credits}`);
    } catch (e) {
        context.log(`Error processing queue item: ${e?.message} ${JSON.stringify(message)}`);
        throw e;
    }
};

export default queueTrigger;
