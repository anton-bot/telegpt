import { getTableClient } from '../common/getTableClient';
import { CommandProcessor } from '../types/CommandProcessor';
import { Model, getModelName, isValidModel } from '../types/Model';
import { Table } from '../types/Table';
import { updateUser } from '../user/updateUser';

export const changeModel: CommandProcessor = async (message, account, parsed, etag) => {
  const newModel = parsed.text;
  if (!newModel) {
    return {
      responseText:
        `Current model is ${getModelName(account.gptModel)}.\n\n` +
        `GPT-4 is the most powerful model, but it's also very expensive. ` +
        'GPT-4 32k can take very long inputs and maintain long conversations. ' +
        'GPT-3.5 Turbo is the cheapest and fastest, and works almost as good as GPT-4 on simple tasks.',
      inlineButtons: [
        Object.values(Model).map((model) => ({
          text: getModelName(model),
          callback_data: `/model ${model}`,
        })),
      ],
    };
  }

  if (!isValidModel(newModel)) {
    return {
      responseText: `That's not the right model. Click on the buttons to change the model.`,
      answerCallbackQuery: message.callbackQuery?.id,
    };
  }

  if (newModel === account.gptModel) {
    return {
      responseText: `Current model is already ${getModelName(newModel)}.`,
      answerCallbackQuery: message.callbackQuery?.id,
    };
  }

  await updateUser(getTableClient(Table.Users), account, etag, (user) => ({
    ...user,
    gptModel: newModel,
  }));

  return {
    responseText: `Model changed to ${getModelName(newModel)}.`,
    answerCallbackQuery: message.callbackQuery?.id,
  };
};
