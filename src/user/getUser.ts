import { User } from "../tables/user";
import { TableClient} from '@azure/data-tables';
import { Table } from "../types/Table";
import { getUserPartitionKey } from "./getUserPartitionKey";

export async function getUser(chatId: number): Promise<User | undefined> {
    const client = TableClient.fromConnectionString(
        process.env.AZURE_STORAGE_CONNECTION_STRING,
        Table.Users,
    );
    
    const partitionKey = getUserPartitionKey(chatId);
    
    try {
        return await client.getEntity<User>(partitionKey, chatId.toString());
    } catch (e) {
        return undefined;
    }
}
