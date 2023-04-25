import { DEFAULT_GPT_MODEL, DEFAULT_CREDITS } from "../constants";
import { User } from "../types/User";
import { Table } from "../types/Table";
import { getUserPartitionKey } from "./getUserPartitionKey";
import { getTableClient } from "../common/getTableClient";

export async function createUser(chatId: number, username: string) {
    if (!Number.isFinite(chatId)) {
        throw new Error(`Invalid chat ID ${chatId} when creating new user ${username}`);
    }

    const newUser: User = {
        partitionKey: getUserPartitionKey(chatId),
        rowKey: chatId.toString(),
        timestamp: Date.now(),
        username: username,
        gptModel: DEFAULT_GPT_MODEL,
        credits: DEFAULT_CREDITS,
        updatedAt: Date.now(),
        isAdmin: false,
    };
    
    const client = getTableClient(Table.Users);
    await client.createEntity(newUser);
    return newUser;
}
