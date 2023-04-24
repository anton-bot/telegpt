export type User = {
    partitionKey: string;
    rowKey: string;
    username: string;
    gptModel: string;
    credits: number;
    updatedAt: number;
    isAdmin: boolean;
};
