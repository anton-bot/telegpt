import { TableClient } from "@azure/data-tables";
import { DEFAULT_GPT_MODEL, DEFAULT_CREDITS, DEFAULT_PARTITION_KEY } from "../constants";
import { User } from "../tables/user";
import { Table } from "../types/Table";
import { getUserPartitionKey } from "./getUserPartitionKey";

export async function createUser(chatId: number, username: string) {
    if (!Number.isFinite(chatId)) {
        throw new Error(`Invalid chat ID ${chatId} when creating new user ${username}`);
    }

    const newUser: User = {
        partitionKey: getUserPartitionKey(chatId),
        rowKey: chatId.toString(),
        username: username,
        gptModel: DEFAULT_GPT_MODEL,
        credits: DEFAULT_CREDITS,
        updatedAt: Date.now(),
        isAdmin: false,
    };
    
    const client = TableClient.fromConnectionString(
        process.env.AZURE_STORAGE_CONNECTION_STRING,
        Table.Users,
    );

    await client.createEntity(newUser);
    return newUser;
}
