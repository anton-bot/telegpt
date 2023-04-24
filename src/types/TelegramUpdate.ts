// Incomplete type for Telegram's message format:
export type TelegramUpdate = {
    update_id: number; // unique ID to identify potential duplicate updates
    message?: Message;
};

type Message = {
    message_id: number;
    date: number;
    text?: string;
    reply_to_message?: TelegramUpdate;
    from: User;
    chat: Chat;
};

type User = {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
};

type Chat = {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    type: ChatType;
};

enum ChatType {
    Private = "private",
    Group = "group",
    Supergroup = "supergroup",
    Channel = "channel",
}

export function isValidTelegramUpdate(o: object): o is TelegramUpdate {
    return "update_id" in o;
}
