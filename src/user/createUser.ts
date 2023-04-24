import { DEFAULT_GPT_MODEL, DEFAULT_CREDITS, DEFAULT_PARTITION_KEY } from "../constants";
import { User } from "../tables/user";

export async function createUser(chatId: number, username: string) {
    if (!Number.isFinite(chatId)) {
        throw new Error(`Invalid chat ID ${chatId} when creating new user ${username}`);
    }

    const newUser: User = {
        PartitionKey: DEFAULT_PARTITION_KEY,
        RowKey: chatId.toString(),
        username: username,
        gptModel: DEFAULT_GPT_MODEL,
        credits: DEFAULT_CREDITS,
        updatedAt: Date.now(),
        isAdmin: false,
    };
    

}
