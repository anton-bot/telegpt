import { TableClient } from "@azure/data-tables";
import { Table } from "../types/Table";

export function getTableClient(tableName: Table) {
    return TableClient.fromConnectionString(
        process.env.AZURE_STORAGE_CONNECTION_STRING,
        tableName,
    );
}
