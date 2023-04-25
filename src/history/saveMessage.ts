import { TableClient } from "@azure/data-tables";
import { HistoryMessage } from "../types/HistoryMessage";


export async function saveMessage(client: TableClient, message: HistoryMessage) {
    await client.createEntity(message);
}