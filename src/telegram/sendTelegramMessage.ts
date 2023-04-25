import { TelegramSendMessageResponse } from "../types/TelegramUpdate";

export async function sendTelegramMessage(
    token: string,
    chatId: number,
    text: string,
    replyToMsgId: number | undefined = undefined,
): Promise<TelegramSendMessageResponse> {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`,
        {
            method: 'POST',
            body: JSON.stringify({
                chat_id: chatId,
                text,
                reply_to_message_id: replyToMsgId,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return await response.json();
}
