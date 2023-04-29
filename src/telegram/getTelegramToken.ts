export function getTelegramToken(chatId?: number): string {
  if (!chatId) {
    return process.env.TELEGRAM_TOKEN;
  }

  // Allows the bot to answer as a different Telegram bot for specific users.
  // To do so, add the override here and also set the webhook of the alternative bot
  // to point to this bot's Azure Function.
  // Example format: { "123456789": "123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11" }
  const overrides = process.env.TELEGRAM_TOKEN_OVERRIDES;
  if (overrides) {
    const userSpecificTokens = JSON.parse(overrides);
    if (userSpecificTokens[chatId]) {
      return userSpecificTokens[chatId];
    }
  }

  return process.env.TELEGRAM_TOKEN;
}
