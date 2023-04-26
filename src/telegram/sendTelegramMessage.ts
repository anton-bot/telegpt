import { TelegramInlineKeyboardButton, TelegramSendMessageResponse } from '../types/TelegramUpdate';

export function sendTelegramMessage(
  token: string,
  chatId: number,
  text: string,
  replyToMsgId: number | string | undefined = undefined,
  inlineButtons?: TelegramInlineKeyboardButton[][],
): Promise<TelegramSendMessageResponse> {
  return callTelegramApi(token, {
    chat_id: chatId,
    text,
    reply_to_message_id: replyToMsgId,
    ...(inlineButtons ? { reply_markup: { inline_keyboard: inlineButtons } } : {}),
  });
}

async function callTelegramApi(token: string, body: object) {
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!data?.ok || !data?.result?.message_id) {
    throw new Error(`Received error from Telegram API: ${JSON.stringify(data)}`);
  }

  return data;
}
