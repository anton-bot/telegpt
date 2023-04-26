import { CommandProcessor } from '../types/CommandProcessor';
import { getModelName } from '../types/Model';

export const showAccountDetails: CommandProcessor = async (message, user) => {
  return {
    responseText:
      `Your account balance is ${user.credits} credits.\n` +
      '\n' +
      `Selected GPT model: ${getModelName(user.gptModel)}\n` +
      `User ID: ${user.rowKey}\n`,
  };
};
