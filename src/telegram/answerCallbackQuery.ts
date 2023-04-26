// When user clicks on an inline button, we receive a "callback query" update.
// Then we need to confirm receiving the update by sending an answerCallbackQuery,
// so that the loading indicator stops in the user's client.
export async function answerCallbackQuery(token: string, callbackQueryId: string) {
  const response = await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: 'POST',
    body: JSON.stringify({
      callback_query_id: callbackQueryId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}
