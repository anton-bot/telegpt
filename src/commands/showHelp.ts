import { CommandProcessor } from '../types/CommandProcessor';

export const showHelp: CommandProcessor = async (message, account) => {
  return {
    responseText:
      `This bot lets you talk to the AI based on GPT-3.5 or GPT-4, like in ChatGPT.\n\n` +
      `To get started, just send me any message.\n\n` +
      `To continue a conversation with the bot, swipe left on the message or tap "Reply".` +
      `Messages that are not replies will be trated as a new conversation.\n\n` +
      `To change between GPT-3.5 and GPT-4, send the /model command.\n\n` +
      `To see your settings and balance, send the /account command.\n\n` +
      `You have ${account.credits} credits remaining. After that, you can purchase more.`,
  };
};
