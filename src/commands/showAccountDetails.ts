import { CommandProcessor } from "../types/CommandProcessor";

export const showAccountDetails: CommandProcessor = async (message, user) => {
    return {
        responseText:
            `Your account balance is ${user.credits} credits.\n`+
            '\n' +
            `Selected GPT model: ${user.gptModel}\n` +
            `User ID: ${user.rowKey}\n`,
    };
};
