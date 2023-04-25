import { User } from "../types/User";
import { Table } from "../types/Table";
import { getUserPartitionKey } from "./getUserPartitionKey";
import { getTableClient } from "../common/getTableClient";

export async function getUser(chatId: number): Promise<User | undefined> {
    const client = getTableClient(Table.Users);
    
    const partitionKey = getUserPartitionKey(chatId);
    
    try {
        return await client.getEntity<User>(partitionKey, chatId.toString());
    } catch (e) {
        return undefined;
    }
}
