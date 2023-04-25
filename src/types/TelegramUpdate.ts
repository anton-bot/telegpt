// Incomplete type for Telegram's message format:
export type TelegramUpdate = {
    update_id: number; // unique ID to identify potential duplicate updates
    message?: TelegramMessage;
};

export type TelegramSendMessageResponse = {
    ok: boolean;
    result: TelegramMessage;
};

 export type TelegramMessage = {
    message_id: number;
    date: number;
    text?: string;
    reply_to_message?: Omit<TelegramMessage, 'reply_to_message'>;
    from: TelegramUser;
    chat: TelegramChat;
};

type TelegramUser = {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
};

type TelegramChat = {
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
