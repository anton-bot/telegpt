export type OutgoingMessage = {
    chatId: number;
    replyTo: number;
    text: string;
};

export function isOutgoingMessage(obj: unknown): obj is OutgoingMessage {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    return 'chatId' in obj
        && 'replyTo' in obj
        && 'text' in obj
        && typeof obj.chatId === 'number'
        && typeof obj.replyTo === 'number'
        && typeof obj.text === 'string';
}
