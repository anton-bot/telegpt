export type User = {
    PartitionKey: string;
    RowKey: string;
    username: string;
    gptModel: string;
    credits: number;
    updatedAt: number;
    isAdmin: boolean;
};
